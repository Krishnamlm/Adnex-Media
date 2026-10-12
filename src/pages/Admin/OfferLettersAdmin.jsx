
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import * as XLSX from "xlsx";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import JSZip from "jszip";
import {
  Upload,
  Download,
  FileText,
  LoaderCircle,
  AlertCircle,
  CheckCircle,
  Send,
  Eye,
} from "lucide-react";

const SIGNATURE_URL = "/signature.png";
const TEMPLATE_URL = "/offer-template.png";
const EMAIL_API_URL = (
  import.meta.env.VITE_EMAIL_API_URL || "http://127.0.0.1:3001"
).replace(/\/$/, "");

const OFFER_TEMPLATE_ID = "internship-selection-offer";
const SELECTED_TEMPLATE_KEY = "adnex_selected_email_template_id";

const REFERENCE_WIDTH = 1000;
const REFERENCE_HEIGHT = 1414;
const A4_WIDTH = 595.276;
const A4_HEIGHT = 841.89;

const LAYOUT = {
  issueDate: { x: 665, top: 250, width: 240, size: 20 },
  offerId: { x: 650, top: 280, width: 338, size: 19 },
  bodyX: 74,
  bodyRight: 930,
  bodyTop: 405,
  bodyBottom: 1320,
  bodySize: 21,
  lineGap: 41,
  paragraphGap: 12,
  signatureLineWidth: 200,
  signatureLineGap: 34,
};

function clean(value) {
  return String(value ?? "").trim();
}

function normalizeHeader(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getField(row, aliases) {
  const wanted = aliases.map(normalizeHeader);
  const key = Object.keys(row).find((item) =>
    wanted.includes(normalizeHeader(item))
  );
  return key ? row[key] : "";
}

function makeValidatedDate(year, month, day) {
  const date = new Date(year, month - 1, day, 12, 0, 0);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function excelDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return makeValidatedDate(
      value.getFullYear(),
      value.getMonth() + 1,
      value.getDate()
    );
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    const parsed = XLSX.SSF.parse_date_code(value);

    return parsed?.y && parsed?.m && parsed?.d
      ? makeValidatedDate(parsed.y, parsed.m, parsed.d)
      : null;
  }

  const input = clean(value);
  if (!input) return null;

  const dmy = input.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmy) {
    return makeValidatedDate(
      Number(dmy[3]),
      Number(dmy[2]),
      Number(dmy[1])
    );
  }

  const iso = input.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    return makeValidatedDate(
      Number(iso[1]),
      Number(iso[2]),
      Number(iso[3])
    );
  }

  const monthName = input.match(
    /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/
  );

  if (monthName) {
    const months = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december",
    ];

    const month = months.indexOf(monthName[2].toLowerCase());

    if (month !== -1) {
      return makeValidatedDate(
        Number(monthName[3]),
        month + 1,
        Number(monthName[1])
      );
    }
  }

  if (/[A-Za-z]/.test(input)) {
    const parsed = new Date(input);

    if (!Number.isNaN(parsed.getTime())) {
      return makeValidatedDate(
        parsed.getFullYear(),
        parsed.getMonth() + 1,
        parsed.getDate()
      );
    }
  }

  return null;
}

function formatDate(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return "—";
  }

  return value.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatNumericDate(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return "";
  }

  return [
    String(value.getDate()).padStart(2, "0"),
    String(value.getMonth() + 1).padStart(2, "0"),
    value.getFullYear(),
  ].join("/");
}

function ordinalDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "—";
  }

  const day = date.getDate();
  const suffix =
    day % 100 >= 11 && day % 100 <= 13
      ? "th"
      : day % 10 === 1
        ? "st"
        : day % 10 === 2
          ? "nd"
          : day % 10 === 3
            ? "rd"
            : "th";

  const month = date.toLocaleDateString("en-IN", { month: "long" });

  return `${day}${suffix} ${month} ${date.getFullYear()}`;
}


function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < start
  ) {
    return "";
  }

  const totalDays = Math.floor(
    (Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
      Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) /
      (1000 * 60 * 60 * 24)
  );

  const completeWeeks = Math.floor(totalDays / 7);

  return `${completeWeeks} ${completeWeeks === 1 ? "week" : "weeks"}`;
}


const DATE_ALIASES = {
  start: [
    "Start Date",
    "Internship Start Date",
    "Starting Date",
    "From Date",
  ],
  end: [
    "End Date",
    "Internship End Date",
    "Concluding Date",
    "To Date",
  ],
};

function getExcelDate(worksheet, rowNumber, aliases, row) {
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
  const wanted = aliases.map(normalizeHeader);
  let columnIndex = -1;

  for (let col = range.s.c; col <= range.e.c; col++) {
    const address = XLSX.utils.encode_cell({
      r: range.s.r,
      c: col,
    });

    if (wanted.includes(normalizeHeader(worksheet[address]?.v))) {
      columnIndex = col;
      break;
    }
  }

  if (columnIndex === -1) {
    return excelDate(getField(row, aliases));
  }

  const address = XLSX.utils.encode_cell({
    r: rowNumber,
    c: columnIndex,
  });

  const cell = worksheet[address];

  if (!cell || cell.v == null || cell.v === "") return null;

  if (typeof cell.w === "string" && cell.w.trim()) {
    const displayedDate = excelDate(cell.w);
    if (displayedDate) return displayedDate;
  }

  return excelDate(cell.v);
}

function makeStudent(row, index, worksheet, worksheetRowIndex) {
  const name = clean(
    getField(row, [
      "Student Name",
      "Full Name",
      "Name",
      "Candidate Name",
    ])
  );

  const email = clean(
    getField(row, [
      "Email",
      "Email Address",
      "Email ID",
      "Candidate Email",
      "Student Email",
      "E-mail",
    ])
  );

  const domain = clean(
    getField(row, [
      "Select Your Preferred Internship Domain",
      "Internship Domain",
      "Domain",
      "Internship",
      "Role",
      "Position",
    ])
  );

  const offerId =
    clean(getField(row, ["Offer ID", "OfferID", "ID"])) ||
    `ADM-${new Date().getFullYear()}-${String(index + 1).padStart(3, "0")}`;

  const startDate = getExcelDate(
    worksheet,
    worksheetRowIndex,
    DATE_ALIASES.start,
    row
  );

  const endDate = getExcelDate(
    worksheet,
    worksheetRowIndex,
    DATE_ALIASES.end,
    row
  );

  const workMode =
    clean(getField(row, ["Work Mode", "Mode", "Internship Mode"])) ||
    "Remote";

  const certificateUrl = clean(
    getField(row, [
      "Certificate URL",
      "Certificate Link",
      "Certificate",
    ])
  );

  const offerLetterUrl = clean(
    getField(row, [
      "Offer Letter URL",
      "Offer Letter Link",
      "Offer URL",
    ])
  );

  const duration = calculateDuration(startDate, endDate);

  const validDates = Boolean(
    startDate && endDate && endDate >= startDate
  );

  return {
    id: `${offerId}-${index}`,
    name,
    email,
    offerId,
    domain,
    startDate,
    endDate,
    workMode,
    duration,
    certificateUrl,
    offerLetterUrl,
    valid: Boolean(name && domain && validDates),
  };
}

function wrapText(text, font, fontSize, maxWidth) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;

    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

async function generateOfferLetter(student, templateBytes) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  const pageImage = await pdfDoc.embedPng(templateBytes);

  page.drawImage(pageImage, {
    x: 0,
    y: 0,
    width: A4_WIDTH,
    height: A4_HEIGHT,
  });

  const sx = (value) => (value / REFERENCE_WIDTH) * A4_WIDTH;
  const sy = (value) => (value / REFERENCE_HEIGHT) * A4_HEIGHT;

  const regularFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const black = rgb(0.04, 0.04, 0.04);

  const dateText = `Date – ${formatNumericDate(new Date())}`;
  
const dateSize = sy(LAYOUT.issueDate.size);
const dateValue = formatNumericDate(new Date());
const dateLabel = "Date – ";
const totalDateWidth =
  boldFont.widthOfTextAtSize(dateLabel, dateSize) +
  regularFont.widthOfTextAtSize(dateValue, dateSize);

let dateX =
  sx(LAYOUT.issueDate.x) +
  sx(LAYOUT.issueDate.width) -
  totalDateWidth;

const dateY = A4_HEIGHT - sy(LAYOUT.issueDate.top) - dateSize;

page.drawText(dateLabel, {
  x: dateX,
  y: dateY,
  size: dateSize,
  font: boldFont,
  color: black,
});

dateX += boldFont.widthOfTextAtSize(dateLabel, dateSize);

page.drawText(dateValue, {
  x: dateX,
  y: dateY,
  size: dateSize,
  font: regularFont,
  color: black,
});

const offerIdText = `Offer ID: ${student.offerId}`;
const offerIdSize = sy(LAYOUT.offerId.size);
const offerIdWidth = boldFont.widthOfTextAtSize(
  offerIdText,
  offerIdSize
);

const offerIdRightMargin = sx(40);
const offerIdX = A4_WIDTH - offerIdRightMargin - offerIdWidth;
const offerIdY =
  A4_HEIGHT - sy(LAYOUT.offerId.top) - offerIdSize;

page.drawText(offerIdText, {
  x: offerIdX,
  y: offerIdY,
  size: offerIdSize,
  font: boldFont,
  color: black,
});

  const bodyX = sx(LAYOUT.bodyX);
  const maxWidth = sx(LAYOUT.bodyRight - LAYOUT.bodyX);
  const minimumY = A4_HEIGHT - sy(LAYOUT.bodyBottom);
  let y = A4_HEIGHT - sy(LAYOUT.bodyTop);


function drawParagraph(text, options = {}) {
  const {
    font = regularFont,
    size = LAYOUT.bodySize,
    gapAfter = LAYOUT.paragraphGap,
  } = options;

  const fontSize = sy(size);
  const lineGap = sy(LAYOUT.lineGap);

  // Support mixed regular and bold text.
  const segments = Array.isArray(text)
    ? text
    : [{ text: String(text), bold: font === boldFont }];

  let line = [];
  let lineWidth = 0;
  const lines = [];

  for (const segment of segments) {
    const segmentFont = segment.bold ? boldFont : regularFont;
    const words = String(segment.text).split(/(\s+)/);

    for (const word of words) {
      if (!word) continue;

      const wordWidth = segmentFont.widthOfTextAtSize(
        word,
        fontSize
      );

      if (lineWidth + wordWidth > maxWidth && line.length > 0) {
        lines.push(line);
        line = [];
        lineWidth = 0;
      }

      line.push({
        text: word,
        font: segmentFont,
        width: wordWidth,
      });

      lineWidth += wordWidth;
    }
  }

  if (line.length) lines.push(line);

  for (const lineSegments of lines) {
    const baseline = y - fontSize;

    if (baseline < minimumY) {
      throw new Error(
        "Offer letter text exceeds the available space. Adjust LAYOUT."
      );
    }

    let x = bodyX;

    for (const segment of lineSegments) {
      page.drawText(segment.text, {
        x,
        y: baseline,
        size: fontSize,
        font: segment.font,
        color: black,
      });

      x += segment.width;
    }

    y -= lineGap;
  }

  y -= sy(gapAfter);
}


  drawParagraph(`Dear ${student.name},`, {
    font: boldFont,
    gapAfter: 12,
  });

  drawParagraph("Congratulations!", {
    font: boldFont,
    gapAfter: 14,
  });

  
drawParagraph(
  [
    { text: "We are delighted to offer you the position of " },
    { text: student.domain, bold: true },
    { text: " Intern", bold: true },
    { text: " at " },
    { text: "AdNex Media", bold: true },
    {
      text: ". As an intern, you will have the opportunity to work on practical projects, develop industry-relevant skills, and apply your knowledge in your selected domain. We look forward to supporting your learning and growth throughout this journey.",
    },
  ],
  { gapAfter: 14 }
);


  
drawParagraph(
  [
    { text: "The internship will commence on " },
    { text: ordinalDate(student.startDate), bold: true },
    { text: " and conclude on " },
    { text: ordinalDate(student.endDate), bold: true },
    { text: ", for a duration of " },
    { text: student.duration, bold: true },
    { text: ". The internship will be conducted in " },
    { text: student.workMode, bold: true },
    {
      text: " mode with a flexible schedule.",
    },
  ],
  { gapAfter: 14 }
);


  drawParagraph(
    "This internship is intended solely for educational and practical learning purposes and does not constitute an offer of employment. You will be expected to follow the internship guidelines and complete the assigned work during the internship period.",
    { gapAfter: 14 }
  );

  drawParagraph(
    "We look forward to your sincere participation, dedication, and willingness to learn. We wish you a productive, meaningful, and rewarding internship experience with AdNex Media.",
    { gapAfter: 18 }
  );

  drawParagraph("Best Regards,", {
    font: boldFont,
    gapAfter: 10,
  });


const signatureResponse = await fetch(SIGNATURE_URL);

if (!signatureResponse.ok) {
  throw new Error(
    "Could not load public/signature.png. Check that the file exists."
  );
}

const signatureBytes = new Uint8Array(
  await signatureResponse.arrayBuffer()
);

const signatureImage = await pdfDoc.embedPng(signatureBytes);

// 1. Signature image
const signatureWidth = sx(150);
const signatureHeight =
  signatureWidth *
  (signatureImage.height / signatureImage.width);

const signatureImageY = y - signatureHeight;

if (signatureImageY < minimumY) {
  throw new Error(
    "Signature image does not fit. Adjust the LAYOUT settings."
  );
}

page.drawImage(signatureImage, {
  x: bodyX,
  y: signatureImageY,
  width: signatureWidth,
  height: signatureHeight,
});

// 2. Program Coordinator
const coordinatorY = signatureImageY - sy(20);

page.drawText("Program Coordinator", {
  x: bodyX,
  y: coordinatorY,
  size: sy(17),
  font: regularFont,
  color: black,
});

// 3. Horizontal line below Program Coordinator
const signatureLineY = coordinatorY - sy(10);

page.drawLine({
  start: { x: bodyX, y: signatureLineY },
  end: {
    x: bodyX + sx(LAYOUT.signatureLineWidth),
    y: signatureLineY,
  },
  thickness: 0.7,
  color: black,
});

// 4. AdNex Media below the horizontal line
page.drawText("AdNex Media", {
  x: bodyX,
  y: signatureLineY - sy(30),
  size: sy(22),
  font: boldFont,
  color: black,
});

// Update cursor position
y = signatureLineY - sy(35);


  return pdfDoc.save();
}

function safeFilename(value) {
  return String(value || "student").replace(/[^a-z0-9_-]/gi, "_");
}

export default function OfferLettersAdmin() {
  const [students, setStudents] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingId, setGeneratingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  
const [bulkSending, setBulkSending] = useState(false);

const [bulkProgress, setBulkProgress] = useState({
  sent: 0,
  total: 0,
});

const [bulkResults, setBulkResults] = useState([]);

  const [selectedTemplateId, setSelectedTemplateId] = useState(
    () => localStorage.getItem(SELECTED_TEMPLATE_KEY) || ""
  );
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [templatesLoading, setTemplatesLoading] = useState(true);

  useEffect(() => {
  let active = true;

  async function loadSelectedTemplate() {
    setTemplatesLoading(true);

    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError) throw authError;

      if (!session?.access_token) {
        throw new Error("Please sign in to your admin account again.");
      }

      const response = await fetch(
        `${EMAIL_API_URL}/api/email/templates`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "Could not load saved email templates."
        );
      }

      const templates = Array.isArray(result.templates)
        ? result.templates
        : [];

      // The backend's saved default is the source of truth.
      const savedId =
        result.defaultTemplateId ||
        result.settings?.defaultTemplateId ||
        "";

      const selected = templates.find(
        (template) => template.id === savedId
      );

      if (!selected) {
        throw new Error(
          "No valid default template is saved. Open Email Management, select a template, and click Save Default."
        );
      }

      if (active) {
        setSelectedTemplateId(selected.id);
        setSelectedTemplateName(selected.name || selected.id);
        localStorage.setItem(SELECTED_TEMPLATE_KEY, selected.id);
      }
    } catch (loadError) {
      console.error("Could not load saved email template:", loadError);

      if (active) {
        setSelectedTemplateId("");
        setSelectedTemplateName("");
        setError(loadError.message || "Could not load the saved template.");
      }
    } finally {
      if (active) setTemplatesLoading(false);
    }
  }

  loadSelectedTemplate();

  const handleFocus = () => {
    loadSelectedTemplate();
  };

  window.addEventListener("focus", handleFocus);

  return () => {
    active = false;
    window.removeEventListener("focus", handleFocus);
  };
}, []);

  async function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setNotice("");
    setStudents([]);
    setFileName(file.name);
    setLoading(true);

    try {
      const data = await file.arrayBuffer();

      const workbook = XLSX.read(data, {
        type: "array",
        cellDates: true,
      });

      const sheetName = workbook.SheetNames[0];

      if (!sheetName) {
        throw new Error("No worksheet was found in this Excel file.");
      }

      const worksheet = workbook.Sheets[sheetName];
      const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

      const rows = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
        raw: true,
      });

      if (!rows.length) {
        throw new Error("The selected worksheet has no student rows.");
      }

      const parsedStudents = rows.map((row, index) =>
        makeStudent(row, index, worksheet, range.s.r + index + 1)
      );

      if (parsedStudents.some((student) => !student.name)) {
        throw new Error(
          'Student names were not found. Use "Full Name" or "Student Name" as the column header.'
        );
      }

      setStudents(parsedStudents);

      const invalidCount = parsedStudents.filter(
        (student) => !student.valid
      ).length;

      setNotice(
        `${parsedStudents.length} student record(s) loaded. ` +
          `${invalidCount} record(s) have missing or invalid domain/date details.`
      );
    } catch (uploadError) {
      setError(uploadError?.message || "Could not read this Excel file.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  }

  async function getTemplateBytes() {
    const response = await fetch(TEMPLATE_URL);

    if (!response.ok) {
      throw new Error(
        "Could not load public/offer-template.png. Check that the file exists."
      );
    }

    return new Uint8Array(await response.arrayBuffer());
  }

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  async function createStudentPdf(student) {
    if (!student.valid) {
      throw new Error(
        `Missing or invalid domain/date details for ${student.name}.`
      );
    }

    const templateBytes = await getTemplateBytes();

    return generateOfferLetter(student, templateBytes);
  }

  async function viewStudentPdf(student) {
    setError("");
    setNotice("");
    setGeneratingId(student.id);

    try {
      const pdfBytes = await createStudentPdf(student);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const openedWindow = window.open(url, "_blank");

      if (!openedWindow) {
        triggerDownload(blob, `Offer-Letter-${safeFilename(student.name)}.pdf`);
        setNotice("Your browser blocked the preview, so the PDF was downloaded.");
      } else {
        window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      }
    } catch (pdfError) {
      setError(pdfError?.message || "Could not preview this offer letter.");
    } finally {
      setGeneratingId("");
    }
  }

  async function downloadStudentPdf(student) {
    setError("");
    setNotice("");
    setGeneratingId(student.id);

    try {
      const pdfBytes = await createStudentPdf(student);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      triggerDownload(
        blob,
        `Offer-Letter-${safeFilename(student.name)}-${safeFilename(student.offerId)}.pdf`
      );

      setNotice(`Offer letter downloaded for ${student.name}.`);
    } catch (pdfError) {
      setError(pdfError?.message || "Could not download the offer letter.");
    } finally {
      setGeneratingId("");
    }
  }
async function sendStudentOfferEmail(student, options = {}) {
  const { showMessages = true } = options;

  if (showMessages) {
    setError("");
    setNotice("");
  }

  const templateId = selectedTemplateId;

  try {
    if (!templateId) {
      throw new Error(
        "No email template is selected. Select and save a template in Email Management first."
      );
    }

    if (!student.name) {
      throw new Error("Student name is missing.");
    }

    if (
      !student.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)
    ) {
      throw new Error(
        `A valid email address is missing for ${student.name}.`
      );
    }

    const isOfferTemplate = templateId === OFFER_TEMPLATE_ID;

    if (
      isOfferTemplate &&
      (!student.valid ||
        !student.domain ||
        !student.startDate ||
        !student.endDate)
    ) {
      throw new Error(
        `Please check the domain and dates for ${student.name} before sending the offer letter.`
      );
    }

    setGeneratingId(student.id);

    const {
      data,
      error: authError,
    } = await supabase.auth.getSession();

    if (authError) throw authError;

    const accessToken = data?.session?.access_token;

    if (!accessToken) {
      throw new Error("Please sign in to your admin account again.");
    }

    const variables = {
      STUDENT_NAME: student.name || "",
      INTERNSHIP_DOMAIN: student.domain || "",
      START_DATE: formatNumericDate(student.startDate),
      END_DATE: formatNumericDate(student.endDate),
      WORK_MODE: student.workMode || "",
      DURATION: student.duration || "",
      OFFER_ID: student.offerId || "",
      CERTIFICATE_URL: student.certificateUrl || "",
      OFFER_LETTER_URL: student.offerLetterUrl || "",
    };

    const formData = new FormData();

    formData.append("recipient", student.email);
    formData.append("templateId", templateId);
    formData.append("variables", JSON.stringify(variables));

    // Also send individual fields for backend compatibility.
    Object.entries(variables).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });

    // Only the internship offer template receives a PDF attachment.
    if (isOfferTemplate) {
      const pdfBytes = await createStudentPdf(student);

      const pdfBlob = new Blob([pdfBytes], {
        type: "application/pdf",
      });

      formData.append(
        "attachment",
        pdfBlob,
        `Offer-Letter-${safeFilename(student.name)}-${safeFilename(
          student.offerId
        )}.pdf`
      );
    }

    const response = await fetch(
      `${EMAIL_API_URL}/api/email/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
      throw new Error(
        result.message ||
          result.error ||
          `Email request failed (${response.status}).`
      );
    }

    if (showMessages) {
      setNotice(
        `Email request accepted for ${student.name} (${student.email}) using "${selectedTemplateName || templateId}".`
      );
    }

    return {
      success: true,
      student,
    };
  } catch (sendError) {
    console.error(
      `Email sending error for ${student.email || student.name}:`,
      sendError
    );

    const message =
      sendError?.message ||
      `Could not send the email to ${student.name}.`;

    if (showMessages) {
      setError(message);
    }

    return {
      success: false,
      student,
      error: message,
    };
  } finally {
    setGeneratingId("");
  }
}

async function sendAllEmails() {
  if (bulkSending) return;

  setError("");
  setNotice("");
  setBulkResults([]);

  // Keep the rest of your existing function unchanged.

  if (templatesLoading || !selectedTemplateId) {
    setError(
      "No saved email template is available. Open Email Management and save a default template first."
    );
    return;
  }

  const isOfferTemplate =
    selectedTemplateId === OFFER_TEMPLATE_ID;

  const eligibleStudents = students.filter((student) => {
    const validEmail =
      student.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email);

    if (!student.name || !validEmail) return false;

    // Offer-letter emails require valid offer-letter details.
    if (isOfferTemplate && !student.valid) return false;

    return true;
  });

  if (!eligibleStudents.length) {
    setError(
      isOfferTemplate
        ? "No students have a valid email, name, domain, and internship dates."
        : "No students have both a name and a valid email address."
    );
    return;
  }

  const skippedCount = students.length - eligibleStudents.length;

  setBulkSending(true);
  setBulkProgress({
    sent: 0,
    total: eligibleStudents.length,
  });

  const results = [];

  try {
    for (let index = 0; index < eligibleStudents.length; index++) {
      const student = eligibleStudents[index];

      setNotice(
        `Sending ${index + 1} of ${eligibleStudents.length}: ${student.name} (${student.email})`
      );

      // Send sequentially, not simultaneously.
      const result = await sendStudentOfferEmail(student, {
        showMessages: false,
      });

      results.push(result);

      setBulkResults([...results]);

      setBulkProgress({
        sent: index + 1,
        total: eligibleStudents.length,
      });
    }

    const successCount = results.filter(
      (result) => result.success
    ).length;

    const failedResults = results.filter(
      (result) => !result.success
    );

    const failedCount = failedResults.length;

    setNotice(
      `Bulk sending finished. ${successCount} email(s) accepted by the server, ${failedCount} failed, and ${skippedCount} student record(s) skipped.`
    );

    if (failedCount > 0) {
      setError(
        "Some emails failed. Review the failed-recipient list below and retry those students individually."
      );
    }
  } finally {
    setBulkSending(false);
    setGeneratingId("");
  }
}

  async function downloadAllZip() {
    setError("");
    setNotice("");
    setGeneratingId("all");

    try {
      const eligibleStudents = students.filter(
        (student) => student.valid
      );

      if (!eligibleStudents.length) {
        throw new Error("There are no valid student records to generate.");
      }

      const templateBytes = await getTemplateBytes();
      const zip = new JSZip();

      for (const student of eligibleStudents) {
        const pdfBytes = await generateOfferLetter(student, templateBytes);

        zip.file(
          `Offer-Letter-${safeFilename(student.name)}-${safeFilename(student.offerId)}.pdf`,
          pdfBytes
        );
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });

      triggerDownload(zipBlob, "AdNex-Media-Offer-Letters.zip");
      setNotice(`${eligibleStudents.length} offer letter(s) downloaded in a ZIP file.`);
    } catch (zipError) {
      setError(zipError?.message || "Could not generate the ZIP file.");
    } finally {
      setGeneratingId("");
    }
  }

  const eligibleCount = students.filter((student) => student.valid).length;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Offer Letter Generator
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload Excel to generate personalized offer letters and send emails.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
          <p className="text-sm font-semibold text-blue-900">
            Selected email template
          </p>
          <p className="mt-1 text-sm text-blue-800">
            {templatesLoading
              ? "Loading selected template..."
              : selectedTemplateName || selectedTemplateId || "No template selected"}
          </p>
          {!templatesLoading && !selectedTemplateId && (
            <p className="mt-1 text-xs text-red-700">
              Open Email Management and select/save a template before sending.
            </p>
          )}
        </div>

        <label
          htmlFor="offer-excel"
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-5 py-10 text-center hover:border-blue-500"
        >
          <Upload className="mb-3 h-9 w-9 text-blue-500" />
          <span className="font-semibold text-gray-800">
            Upload student Excel file
          </span>
          <span className="mt-1 text-sm text-gray-500">
            Choose an .xlsx or .xls file
          </span>
          <input
            id="offer-excel"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="sr-only"
          />
        </label>

        {fileName && (
          <p className="mt-3 text-sm text-gray-600">
            Selected file: <strong>{fileName}</strong>
          </p>
        )}

        {loading && (
          <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Reading Excel file…
          </p>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {notice && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        
{bulkSending && (
  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
    <div className="mb-2 flex items-center justify-between text-sm">
      <span className="font-semibold text-blue-900">
        Sending emails...
      </span>
      <span className="text-blue-700">
        {bulkProgress.sent} / {bulkProgress.total}
      </span>
    </div>

    <div className="h-2 overflow-hidden rounded-full bg-blue-100">
      <div
        className="h-full rounded-full bg-blue-600 transition-all"
        style={{
          width: `${
            bulkProgress.total
              ? (bulkProgress.sent / bulkProgress.total) * 100
              : 0
          }%`,
        }}
      />
    </div>
  </div>
)}

{bulkResults.length > 0 && (
  <div className="rounded-xl border border-gray-200 bg-white p-4">
    <h3 className="mb-3 font-semibold text-gray-900">
      Bulk Email Results
    </h3>

    <p className="mb-3 text-sm text-gray-600">
      Successful: {bulkResults.filter((r) => r.success).length}
      {" · "}
      Failed: {bulkResults.filter((r) => !r.success).length}
    </p>

    <div className="space-y-2">
      {bulkResults
        .filter((result) => !result.success)
        .map((result) => (
          <div
            key={result.student.id}
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            <strong>{result.student.name}</strong>
            {" — "}
            {result.student.email}
            <p className="mt-1">{result.error}</p>
          </div>
        ))}
    </div>
  </div>
)}

      </div>

      {students.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Student Records</h2>
              <p className="text-sm text-gray-500">
                {eligibleCount} of {students.length} records ready for PDF generation
              </p>
            </div>

            <button
    type="button"
    onClick={sendAllEmails}
    disabled={
      loading ||
      templatesLoading ||
      !selectedTemplateId ||
      bulkSending ||
      Boolean(generatingId) ||
      students.length === 0
    }
    className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {bulkSending ? (
      <LoaderCircle className="h-4 w-4 animate-spin" />
    ) : (
      <Send className="h-4 w-4" />
    )}
    {bulkSending ? "Sending Emails..." : "Send All Emails"}
  </button>

  <button
    type="button"
    onClick={downloadAllZip}
    disabled={
      loading ||
      bulkSending ||
      Boolean(generatingId) ||
      eligibleCount === 0
    }
    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {generatingId === "all" ? (
      <LoaderCircle className="h-4 w-4 animate-spin" />
    ) : (
      <Download className="h-4 w-4" />
    )}
    Download All as ZIP
  </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Student Name",
                    "Email",
                    "Offer ID",
                    "Domain",
                    "Start Date",
                    "End Date",
                    "Duration",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                      {student.name || "Missing name"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {student.email || "Missing email"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {student.offerId}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {student.domain || "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {formatDate(student.startDate)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {formatDate(student.endDate)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {student.duration || "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => viewStudentPdf(student)}
                          disabled={!student.valid || Boolean(generatingId)}
                          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {generatingId === student.id ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          View PDF
                        </button>

                        <button
                          type="button"
                          onClick={() => downloadStudentPdf(student)}
                          disabled={!student.valid || Boolean(generatingId)}
                          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Download className="h-4 w-4" />
                          Download PDF
                        </button>

                        <button
                          type="button"
                          onClick={() => sendStudentOfferEmail(student)}
                          disabled={
                            !student.email ||
                            !selectedTemplateId ||
                            templatesLoading ||
                            Boolean(generatingId)
                          }
                          title={
                            !student.email
                              ? "Add the student's email in Excel"
                              : !selectedTemplateId
                                ? "Select a template in Email Management first"
                                : "Send the selected HTML template to this student"
                          }
                          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {generatingId === student.id ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                          Send Email
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
