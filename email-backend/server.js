
import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from "multer";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = Number(process.env.PORT || 3001);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const SETTINGS_FILE = path.join(DATA_DIR, "email-settings.json");
const TEMPLATE_OVERRIDES_FILE = path.join(
  DATA_DIR,
  "email-templates.json"
);
const TEMPLATES_DIR = path.join(__dirname, "templates");

const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "hr@adnexmedia.in";
const SMTP_PASS = process.env.SMTP_PASS;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY;

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;
const MAX_TEMPLATE_BODY_SIZE = 500 * 1024;
const MAX_BULK_ROWS_PER_BATCH = 100;

const supabase =
  SUPABASE_URL && SUPABASE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      })
    : null;

/* -------------------- Template definitions -------------------- */

const EMAIL_TEMPLATES = [
  {
    id: "application-received",
    name: "Internship Application Received",
    fileName: "application-received.html",
    subject: "Internship Application Received – AdNex Media",
    description: "Confirms receipt of an internship application.",
    placeholders: ["STUDENT_NAME", "INTERNSHIP_DOMAIN"],
  },
  {
    id: "internship-selection-offer",
    name: "Internship Selection & Offer Letter",
    fileName: "internship-selection-offer.html",
    subject: "Internship Selection & Offer Letter – AdNex Media",
    description: "Confirms selection and provides offer details.",
    placeholders: [
      "STUDENT_NAME",
      "INTERNSHIP_DOMAIN",
      "START_DATE",
      "END_DATE",
      "OFFER_LETTER_URL",
    ],
  },
  {
    id: "internship-onboarding",
    name: "Internship Onboarding",
    fileName: "internship-onboarding.html",
    subject:
      "Internship Onboarding – Task Sheet & Submission Guidelines | AdNex Media",
    description: "Provides onboarding and task submission instructions.",
    placeholders: [
      "STUDENT_NAME",
      "INTERNSHIP_DOMAIN",
      "START_DATE",
      "END_DATE",
    ],
  },
  {
    id: "submission-received",
    name: "Internship Submission Received",
    fileName: "submission-received.html",
    subject: "Internship Submission Received – AdNex Media",
    description: "Confirms receipt of submitted internship tasks.",
    placeholders: ["STUDENT_NAME", "INTERNSHIP_DOMAIN"],
  },
  {
    id: "submission-deadline-reminder",
    name: "Internship Submission Deadline Reminder",
    fileName: "submission-deadline-reminder.html",
    subject: "Internship Submission Deadline Reminder – AdNex Media",
    description: "Reminds the intern of the submission deadline.",
    placeholders: ["STUDENT_NAME", "INTERNSHIP_DOMAIN", "END_DATE"],
  },
  {
    id: "internship-completion",
    name: "Internship Completion & Certificate",
    fileName: "internship-completion.html",
    subject: "Congratulations on Completing Your Internship | AdNex Media",
    description: "Celebrates completion and provides the certificate link.",
    placeholders: [
      "STUDENT_NAME",
      "INTERNSHIP_DOMAIN",
      "CERTIFICATE_URL",
    ],
  },
];

const DEFAULT_SETTINGS = {
  attachmentTemplateId: "internship-selection-offer",
  defaultTemplateId: "internship-selection-offer",
};

if (!SMTP_PASS) {
  console.warn("WARNING: SMTP_PASS is not configured.");
}

if (!supabase) {
  console.warn("WARNING: Supabase environment variables are missing.");
}

if (!ADMIN_EMAILS.length) {
  console.warn("WARNING: ADMIN_EMAILS is empty. Admin access will be denied.");
}

/* -------------------- Middleware -------------------- */

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      const normalized = origin.replace(/\/$/, "");

      if (ALLOWED_ORIGINS.includes(normalized)) {
        return callback(null, true);
      }

      const localDevelopment =
        process.env.NODE_ENV !== "production" &&
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

      if (localDevelopment) return callback(null, true);

      return callback(new Error("Origin not allowed by CORS."));
    },
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: false,
    maxAge: 86400,
  })
);

app.use(express.json({ limit: "2mb" }));

const emailApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip(req) {
    return req.path === "/send" || req.path === "/test";
  },
  message: {
    success: false,
    code: "EMAIL_API_RATE_LIMIT",
    message: "Too many email API requests. Please wait and try again.",
  },
});

const emailSendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    code: "EMAIL_SEND_RATE_LIMIT",
    message:
      "The email sending limit was reached. Wait before sending more emails.",
  },
});

app.use("/api/email", emailApiLimiter);

/* -------------------- Persistent JSON storage -------------------- */

let settingsWriteQueue = Promise.resolve();
let templatesWriteQueue = Promise.resolve();

async function ensureDataDirectory() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile(filePath, fallback) {
  await ensureDataDirectory();

  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function atomicWriteJson(filePath, value, queueName) {
  await ensureDataDirectory();

  const write = async () => {
    const tempFile = `${filePath}.tmp`;

    await fs.writeFile(
      tempFile,
      JSON.stringify(value, null, 2),
      "utf8"
    );

    await fs.rename(tempFile, filePath);
  };

  if (queueName === "settings") {
    settingsWriteQueue = settingsWriteQueue.then(write);
    await settingsWriteQueue;
  } else {
    templatesWriteQueue = templatesWriteQueue.then(write);
    await templatesWriteQueue;
  }
}

async function readSettings() {
  const saved = await readJsonFile(SETTINGS_FILE, null);

  if (!saved) {
    await writeSettings(DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
  }

  const merged = { ...DEFAULT_SETTINGS, ...saved };

  if (!findTemplate(merged.attachmentTemplateId)) {
    merged.attachmentTemplateId =
      DEFAULT_SETTINGS.attachmentTemplateId;
  }

  if (!findTemplate(merged.defaultTemplateId)) {
    merged.defaultTemplateId =
      merged.attachmentTemplateId || DEFAULT_SETTINGS.defaultTemplateId;
  }

  return merged;
}

async function writeSettings(settings) {
  return atomicWriteJson(SETTINGS_FILE, settings, "settings");
}

async function readTemplateOverrides() {
  const saved = await readJsonFile(TEMPLATE_OVERRIDES_FILE, {});
  return saved && typeof saved === "object" && !Array.isArray(saved)
    ? saved
    : {};
}

async function writeTemplateOverrides(overrides) {
  return atomicWriteJson(
    TEMPLATE_OVERRIDES_FILE,
    overrides,
    "templates"
  );
}

/* -------------------- SMTP -------------------- */

function getConfiguredTransporter() {
  if (!SMTP_PASS) {
    throw new Error("SMTP_PASS is missing from the backend environment.");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
  });
}

/* -------------------- Admin authentication -------------------- */

async function requireAdmin(req, res, next) {
  try {
    if (!supabase) {
      return res.status(503).json({
        success: false,
        message: "Supabase authentication is not configured.",
      });
    }

    const authorization = req.headers.authorization || "";
    const match = authorization.match(/^Bearer\s+(.+)$/i);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please sign in again.",
      });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(match[1]);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Your session is invalid or expired. Please sign in again.",
      });
    }

    const email = user.email?.trim().toLowerCase();

    if (!email || !ADMIN_EMAILS.includes(email)) {
      return res.status(403).json({
        success: false,
        message: "Your account is not authorized for email management.",
      });
    }

    req.admin = { id: user.id, email };
    return next();
  } catch (error) {
    console.error("Admin authentication error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not verify administrator access.",
    });
  }
}

/* -------------------- Validation helpers -------------------- */

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: MAX_ATTACHMENT_SIZE,
  },
  fileFilter(req, file, callback) {
    const isPdf =
      file.mimetype === "application/pdf" &&
      /\.pdf$/i.test(file.originalname || "");

    if (!isPdf) {
      return callback(new Error("Only PDF attachments are allowed."));
    }

    return callback(null, true);
  },
});

function isValidEmail(value) {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

function normalizeSubject(value) {
  if (typeof value !== "string") return "";

  return value
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, 200);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function findTemplate(id) {
  return EMAIL_TEMPLATES.find((template) => template.id === id);
}

async function getTemplate(template) {
  const overrides = await readTemplateOverrides();
  const saved = overrides[template.id] || {};

  let defaultBody;

  try {
    defaultBody = await fs.readFile(
      path.join(TEMPLATES_DIR, template.fileName),
      "utf8"
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Template file not found: ${template.fileName}`);
    }

    throw error;
  }

  return {
    ...template,
    subject:
      typeof saved.subject === "string" ? saved.subject : template.subject,
    body: typeof saved.body === "string" ? saved.body : defaultBody,
    isCustomized:
      typeof saved.subject === "string" || typeof saved.body === "string",
  };
}

/*
 * Only allow placeholders supported by the selected template.
 * Disallow scriptable elements and inline JavaScript in saved email HTML.
 * The template editor is intended for HTML email markup, not arbitrary web pages.
 */

function validateTemplateContent(template, subject, body) {
  if (!subject || subject.length > 200) {
    throw new Error(
      "Subject is required and must be 200 characters or fewer."
    );
  }

  if (typeof body !== "string" || !body.trim()) {
    throw new Error("Email HTML body cannot be empty.");
  }

  if (Buffer.byteLength(body, "utf8") > MAX_TEMPLATE_BODY_SIZE) {
    throw new Error("Email HTML body cannot exceed 500 KB.");
  }

  // Block active content and elements unsuitable for email templates.
  
  // Identify the exact HTML element rejected by validation.
  const forbiddenElement =
    /<\s*\/?\s*(script|iframe|object|embed|form|base|meta|applet|frame|frameset|portal)\b[^>]*>/i;

  const forbiddenMatch = body.match(forbiddenElement);

  if (forbiddenMatch) {
    const tagMatch = forbiddenMatch[0].match(
      /^<\s*\/?\s*([a-z][a-z0-9-]*)/i
    );

    const tagName = tagMatch ? tagMatch[1].toLowerCase() : "unknown";

    throw new Error(
      `Unsupported HTML element <${tagName}> detected. Remove this element from the email template and save again.`
    );
  }


  // Block inline JavaScript event handlers.
  if (/\s+on[a-z][a-z0-9_-]*\s*=/i.test(body)) {
    throw new Error(
      "Inline JavaScript event handlers are not allowed."
    );
  }

  // Block JavaScript URLs, including whitespace obfuscation.
  if (/javascript\s*:/i.test(body)) {
    throw new Error(
      "JavaScript URLs are not allowed in email templates."
    );
  }

  // Only permit placeholders defined for this template.
  const foundPlaceholders = [
    ...body.matchAll(/\{\{([A-Z][A-Z0-9_]*)\}\}/g),
  ].map((match) => match[1]);

  const allowed = new Set(template.placeholders || []);

  const unsupported = [
    ...new Set(foundPlaceholders),
  ].filter((key) => !allowed.has(key));

  if (unsupported.length) {
    throw new Error(
      `Unsupported placeholder(s): ${unsupported.join(", ")}.`
    );
  }

  // Reject malformed double-brace placeholders.
  const malformed = body.match(/\{\{[^{}]*\}\}/g) || [];

  for (const token of malformed) {
    if (!/^\{\{[A-Z][A-Z0-9_]*\}\}$/.test(token)) {
      throw new Error(
        `Invalid placeholder format: ${token}`
      );
    }
  }
}


function renderEmailTemplate(html, variables = {}) {
  return html.replace(
    /\{\{([A-Z][A-Z0-9_]*)\}\}/g,
    (match, key) => {
      const value = variables[key];

      if (
        value === undefined ||
        value === null ||
        !String(value).trim()
      ) {
        throw new Error(`Missing required template value: ${key}`);
      }

      if (key === "CERTIFICATE_URL" || key === "OFFER_LETTER_URL") {
        let url;

        try {
          url = new URL(String(value).trim());
        } catch {
          throw new Error(`Please provide a valid ${key} URL.`);
        }

        if (url.protocol !== "https:") {
          throw new Error(`${key} must use HTTPS.`);
        }

        return escapeHtml(url.href);
      }

      return escapeHtml(String(value).trim());
    }
  );
}

function createPlainTextVersion(html) {
  return html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/(p|div|tr|h[1-6]|li|table)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/gi, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* -------------------- Health check -------------------- */



function healthCheck(req, res) {
  res.status(200).json({
    success: true,
    service: "AdNex Media Email API",
    status: "running",
    timestamp: new Date().toISOString(),
  });
}

app.get("/", healthCheck);
app.get("/health", healthCheck);



/* -------------------- Protected email routes -------------------- */

app.use("/api/email", requireAdmin);

/* GET /api/email/templates */

app.get("/api/email/templates", async (req, res) => {
  try {
    const settings = await readSettings();

    const templates = await Promise.all(
      EMAIL_TEMPLATES.map((template) => getTemplate(template))
    );

    return res.json({
      success: true,
      templates,
      attachmentTemplateId: settings.attachmentTemplateId,
      defaultTemplateId: settings.defaultTemplateId,
    });
  } catch (error) {
    console.error("Load email templates error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not load email templates.",
    });
  }
});

/* PUT /api/email/templates/:id
   Saves the edited subject and HTML body. */

app.put("/api/email/templates/:id", async (req, res) => {
  try {
    const template = findTemplate(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "The selected email template does not exist.",
      });
    }

    const subject = normalizeSubject(req.body?.subject);
    const body =
      typeof req.body?.body === "string" ? req.body.body : "";

    validateTemplateContent(template, subject, body);

    const overrides = await readTemplateOverrides();

    overrides[template.id] = {
      subject,
      body,
      updatedAt: new Date().toISOString(),
      updatedBy: req.admin.email,
    };

    await writeTemplateOverrides(overrides);

    return res.json({
      success: true,
      message: "Email template saved successfully.",
      template: {
        ...template,
        subject,
        body,
        isCustomized: true,
        updatedAt: overrides[template.id].updatedAt,
      },
    });
  } catch (error) {
    const validationError =
      error.message.startsWith("Subject is required") ||
      error.message.startsWith("Email HTML body") ||
      error.message.startsWith("Unsupported HTML element")  ||
      error.message.startsWith("Inline JavaScript") ||
      error.message.startsWith("JavaScript URLs") ||
      error.message.startsWith("Unsupported placeholder") ||
      error.message.startsWith("Invalid placeholder");

    console.error("Save email template error:", error);

    return res.status(validationError ? 400 : 500).json({
      success: false,
      message: validationError
        ? error.message
        : "Could not save the email template.",
    });
  }
});

/* GET /api/email/settings */

app.get("/api/email/settings", async (req, res) => {
  try {
    const settings = await readSettings();

    return res.json({
      success: true,
      settings,
      attachmentTemplateId: settings.attachmentTemplateId,
      defaultTemplateId: settings.defaultTemplateId,
    });
  } catch (error) {
    console.error("Load email settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not load email settings.",
    });
  }
});

/* PUT /api/email/settings
   Saves the default template used by Excel sending.
   attachmentTemplateId remains supported for compatibility. */


app.put("/api/email/settings", async (req, res) => {
  try {
    const body = req.body || {};
    const current = await readSettings();

    // Update only the settings explicitly provided.
    const defaultTemplateId =
      body.defaultTemplateId !== undefined
        ? body.defaultTemplateId
        : current.defaultTemplateId;

    const attachmentTemplateId =
      body.attachmentTemplateId !== undefined
        ? body.attachmentTemplateId
        : current.attachmentTemplateId;

    if (
      typeof defaultTemplateId !== "string" ||
      !findTemplate(defaultTemplateId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid default email template.",
      });
    }

    if (
      typeof attachmentTemplateId !== "string" ||
      !findTemplate(attachmentTemplateId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid attachment template.",
      });
    }

    const updated = {
      ...current,
      defaultTemplateId,
      attachmentTemplateId,
    };

    await writeSettings(updated);

    return res.status(200).json({
      success: true,
      message: "Default template settings saved successfully.",
      settings: updated,
    });
  } catch (error) {
    console.error("Save settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not save default template settings.",
    });
  }
});


/* POST /api/email/send
   Accepts JSON or multipart/form-data.
   Offer emails require one personalized PDF attachment. */

app.post(
  "/api/email/send",
  emailSendLimiter,
  (req, res, next) => {
    const contentType = req.headers["content-type"] || "";

    if (contentType.includes("multipart/form-data")) {
      return upload.single("attachment")(req, res, next);
    }

    return next();
  },
  async (req, res) => {
    try {
      const recipient =
        typeof req.body?.recipient === "string"
          ? req.body.recipient.trim()
          : "";

      const templateId =
        typeof req.body?.templateId === "string"
          ? req.body.templateId.trim()
          : "";

      if (!isValidEmail(recipient)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid recipient email address.",
        });
      }

      const templateDefinition = findTemplate(templateId);

      if (!templateDefinition) {
        return res.status(400).json({
          success: false,
          message: "The selected email template does not exist.",
        });
      }

      const template = await getTemplate(templateDefinition);

      const suppliedVariables =
        req.body?.variables &&
        typeof req.body.variables === "object" &&
        !Array.isArray(req.body.variables)
          ? req.body.variables
          : {};

      const variables = {};

      for (const key of template.placeholders) {
        const value =
          suppliedVariables[key] ??
          req.body?.[key] ??
          suppliedVariables[key.toLowerCase()];

        variables[key] =
          typeof value === "string" ? value.trim() : value;
      }

      const isOfferEmail =
        templateId === "internship-selection-offer";

      if (isOfferEmail && !req.file) {
        return res.status(400).json({
          success: false,
          code: "OFFER_PDF_REQUIRED",
          message:
            "Attach the student's personalized offer letter PDF.",
        });
      }

      if (!isOfferEmail && req.file) {
        return res.status(400).json({
          success: false,
          message:
            "PDF attachments are only accepted for the internship selection offer template.",
        });
      }

      const renderedHtml = renderEmailTemplate(
        template.body,
        variables
      );

      if (/\{\{[^{}]+\}\}/.test(renderedHtml)) {
        return res.status(400).json({
          success: false,
          message:
            "The selected template contains unresolved placeholders.",
        });
      }

      const requestedSubject = normalizeSubject(req.body?.subject);
      const subject = requestedSubject || template.subject;

      if (!subject) {
        return res.status(400).json({
          success: false,
          message: "The email subject is empty.",
        });
      }

      const mailOptions = {
        from: {
          name: "AdNex Media",
          address: SMTP_USER,
        },
        to: recipient,
        subject,
        text: createPlainTextVersion(renderedHtml),
        html: renderedHtml,
      };

      if (isOfferEmail) {
        mailOptions.attachments = [
          {
            filename: path.basename(
              req.file.originalname || "offer-letter.pdf"
            ),
            content: req.file.buffer,
            contentType: "application/pdf",
          },
        ];
      }

      const transporter = getConfiguredTransporter();
      const info = await transporter.sendMail(mailOptions);

      console.info("Email sent successfully:", {
        recipient,
        templateId,
        admin: req.admin.email,
        messageId: info.messageId,
        attachmentIncluded: isOfferEmail,
      });

      return res.status(200).json({
        success: true,
        message: "Designed HTML email sent successfully.",
        messageId: info.messageId,
        recipient,
        templateId,
        attachmentIncluded: isOfferEmail,
      });
    } catch (error) {
      console.error("Email send error:", error);

      const isValidationError =
        error.message.startsWith("Missing required template value:") ||
        error.message.includes("must use HTTPS") ||
        error.message.includes("valid CERTIFICATE_URL") ||
        error.message.includes("valid OFFER_LETTER_URL");

      return res.status(isValidationError ? 400 : 500).json({
        success: false,
        message: isValidationError
          ? error.message
          : "Email could not be sent. Check the template files and SMTP settings.",
      });
    }
  }
);

/* POST /api/email/test */

app.post("/api/email/test", async (req, res) => {
  try {
    const transporter = getConfiguredTransporter();

    const info = await transporter.sendMail({
      from: {
        name: "AdNex Media HR",
        address: SMTP_USER,
      },
      to: req.admin.email,
      subject: "AdNex Media SMTP Test",
      text: "Your AdNex Media email backend is able to send email.",
    });

    return res.json({
      success: true,
      message: "SMTP test email sent successfully.",
      messageId: info.messageId,
      recipient: req.admin.email,
    });
  } catch (error) {
    console.error("SMTP test error:", error);

    return res.status(500).json({
      success: false,
      message:
        "SMTP test failed. Check your SMTP credentials and settings.",
    });
  }
});

/* -------------------- Error handling -------------------- */

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error instanceof multer.MulterError) {
    const tooLarge = error.code === "LIMIT_FILE_SIZE";

    return res.status(tooLarge ? 413 : 400).json({
      success: false,
      message: tooLarge
        ? "The PDF attachment exceeds the 10 MB limit."
        : `Attachment upload error: ${error.message}`,
    });
  }

  if (error.message === "Only PDF attachments are allowed.") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error.message === "Origin not allowed by CORS.") {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }

  console.error("Unhandled backend error:", error);

  return res.status(500).json({
    success: false,
    message: "An unexpected backend error occurred.",
  });
});

/* -------------------- Start server -------------------- */

async function startServer() {
  await ensureDataDirectory();

  app.listen(PORT, "0.0.0.0", () => {
    console.info(`AdNex Media Email API listening on port ${PORT}`);
    console.info(`Health: http://127.0.0.1:${PORT}/health`);
    console.info(`SMTP: ${SMTP_HOST}:${SMTP_PORT}`);
    console.info(`Sender: ${SMTP_USER}`);
  });
}

startServer().catch((error) => {
  console.error("Could not start email backend:", error);
  process.exit(1);
});
