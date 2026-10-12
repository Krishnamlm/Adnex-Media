
import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Send,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  LoaderCircle,
  FileText,
  Paperclip,
  Save,
  Eye,
  Code2,
  Star,
} from "lucide-react";
import { supabase } from "../../lib/supabase";


const API_BASE_URL = (
  import.meta.env.VITE_EMAIL_API_URL || "http://127.0.0.1:3001"
).replace(/\/$/, "");


const OFFER_TEMPLATE_ID = "internship-selection-offer";

const FIELD_LABELS = {
  STUDENT_NAME: "Student Name",
  INTERNSHIP_DOMAIN: "Internship Domain",
  START_DATE: "Internship Start Date",
  END_DATE: "Submission Deadline / End Date",
  CERTIFICATE_URL: "Certificate URL (HTTPS)",
  OFFER_LETTER_URL: "Offer Letter PDF URL (HTTPS)",
};

const SAMPLE_VALUES = {
  STUDENT_NAME: "Rahul Sharma",
  INTERNSHIP_DOMAIN: "Digital Marketing",
  START_DATE: "15 October 2026",
  END_DATE: "15 November 2026",
  CERTIFICATE_URL: "https://example.com/certificate",
  OFFER_LETTER_URL: "https://example.com/offer-letter.pdf",
};

function getTemplateBody(template) {
  return template?.body ?? template?.html ?? "";
}

function EmailManagement() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [defaultTemplateId, setDefaultTemplateId] = useState("");
  const [attachmentTemplateId, setAttachmentTemplateId] =
    useState(OFFER_TEMPLATE_ID);

  // Template editor state
  const [editorSubject, setEditorSubject] = useState("");
  const [editorBody, setEditorBody] = useState("");
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [previewMode, setPreviewMode] = useState("preview");

  // Compose state
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [variables, setVariables] = useState({});
  const [offerPdf, setOfferPdf] = useState(null);

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const selected = templates.find(
    (template) => template.id === selectedTemplate
  );

  const isOfferEmail = selectedTemplate === OFFER_TEMPLATE_ID;

  
const hasEditorChanges = Boolean(
  selected &&
    (
      editorSubject !== (selected.subject ?? "") ||
      editorBody !== (selected.body ?? selected.html ?? "")
    )
);


  const previewHtml = useMemo(() => {
    let html = editorBody;

    for (const [key, value] of Object.entries(SAMPLE_VALUES)) {
      html = html.split(`{{${key}}}`).join(value);
      html = html.split(`{${key}}`).join(value);
    }

    return html;
  }, [editorBody]);

  async function apiRequest(path, options = {}) {
    async function getAccessToken(forceRefresh = false) {
      if (forceRefresh) {
        const {
          data: { session },
          error: refreshError,
        } = await supabase.auth.refreshSession();

        if (refreshError) throw refreshError;

        if (!session?.access_token) {
          throw new Error("Session expired. Please sign in again.");
        }

        return session.access_token;
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (!session?.access_token) {
        throw new Error(
          "No active admin session. Please sign in again."
        );
      }

      return session.access_token;
    }

    async function sendRequest(token) {
      const headers = new Headers(options.headers || {});

      headers.set("Authorization", `Bearer ${token}`);

      if (options.body && !(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
      }

      return fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
        credentials: "omit",
      });
    }

    let token = await getAccessToken();
    let response = await sendRequest(token);

    if (response.status === 401) {
      token = await getAccessToken(true);
      response = await sendRequest(token);
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Email API request failed:", {
        path,
        status: response.status,
        message: data.message,
      });

      throw new Error(
        data.message || `Request failed (${response.status}).`
      );
    }

    return data;
  }

  function applySelectedTemplate(template) {
    if (!template) return;

    setSelectedTemplate(template.id);
    setEditorSubject(template.subject || "");
    setEditorBody(getTemplateBody(template));
    setSubject(template.subject || "");
    setVariables({});
    setOfferPdf(null);
    setPreviewMode("preview");
  }


async function loadTemplates() {
  setLoading(true);
  setError("");
  setNotice("");

  try {
    const [templateResult, settingsResult] = await Promise.all([
      apiRequest("/api/email/templates"),
      apiRequest("/api/email/settings"),
    ]);

    const loadedTemplates = templateResult.templates || [];
    const settings = settingsResult.settings || settingsResult;

    const savedDefault = settings.defaultTemplateId || "";
    const savedAttachment =
      settings.attachmentTemplateId || OFFER_TEMPLATE_ID;

    setTemplates(loadedTemplates);
    setDefaultTemplateId(savedDefault);
    setAttachmentTemplateId(savedAttachment);

    if (!loadedTemplates.length) {
      setSelectedTemplate("");
      setEditorSubject("");
      setEditorBody("");
      setSubject("");
      setVariables({});
      setOfferPdf(null);
      setError("The backend returned no email templates.");
      return;
    }

    // Preserve the currently selected template if it still exists.
    setSelectedTemplate((current) => {
      const currentExists = loadedTemplates.some(
        (template) => template.id === current
      );

      const nextId = currentExists
        ? current
        : loadedTemplates.some(
              (template) => template.id === savedDefault
            )
          ? savedDefault
          : loadedTemplates[0].id;

      const nextTemplate = loadedTemplates.find(
        (template) => template.id === nextId
      );

      if (nextTemplate) {
        setEditorSubject(nextTemplate.subject || "");
        setEditorBody(getTemplateBody(nextTemplate));
        setSubject(nextTemplate.subject || "");
      }

      return nextId;
    });
  } catch (err) {
    setError(
      `${err.message} Check that the backend is running and that you are signed in as an authorized administrator.`
    );
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    loadTemplates();
    // Initial load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
function chooseTemplate(id) {
  const template = templates.find(
    (item) => item.id === id
  );

  if (!template) return;

  setSelectedTemplate(template.id);

  // Load the selected template's saved content into the editor.
  setEditorSubject(template.subject ?? "");
  setEditorBody(template.body ?? template.html ?? "");

  // Sync the compose subject.
  setSubject(template.subject ?? "");

  // Reset data belonging to the previously selected template.
  setVariables({});
  setOfferPdf(null);

  setPreviewMode("preview");
  setError("");
  setNotice("");
}


  function updateVariable(key, value) {
    setVariables((current) => ({
      ...current,
      [key]: value,
    }));
  }




async function saveTemplate() {
  const templateId = selectedTemplate;

  if (savingTemplate) return;

  const currentTemplate = templates.find(
    (template) => template.id === templateId
  );

  if (!currentTemplate) {
    setError("Please select a template before saving.");
    return;
  }

  const nextSubject = editorSubject.trim();
  const nextBody = editorBody;

  if (!nextSubject) {
    setError("Template subject cannot be empty.");
    return;
  }

  if (!nextBody.trim()) {
    setError("Template HTML body cannot be empty.");
    return;
  }

  setSavingTemplate(true);
  setError("");
  setNotice("");

  try {
    const result = await apiRequest(
      `/api/email/templates/${encodeURIComponent(templateId)}`,
      {
        method: "PUT",
        body: JSON.stringify({
          subject: nextSubject,
          body: nextBody,
        }),
      }
    );

    if (result?.success !== true || !result?.template) {
      throw new Error(
        result?.message || "The backend did not confirm the save."
      );
    }

    const savedTemplate = result.template;

    setSelectedTemplate(templateId);

    setTemplates((previous) =>
      previous.map((template) =>
        template.id === templateId
          ? {
              ...template,
              ...savedTemplate,
              body: savedTemplate.body ?? nextBody,
              subject: savedTemplate.subject ?? nextSubject,
              isCustomized: true,
            }
          : template
      )
    );

    setEditorSubject(savedTemplate.subject ?? nextSubject);
    setEditorBody(savedTemplate.body ?? nextBody);
    setSubject(savedTemplate.subject ?? nextSubject);

    setNotice(
      `Successfully saved "${savedTemplate.name || currentTemplate.name}".`
    );
  } catch (err) {
    console.error("Save template error:", err);

    setError(
      `Unable to save "${currentTemplate.name}": ${
        err?.message || "Unexpected error"
      }`
    );
  } finally {
    setSavingTemplate(false);
  }
}






async function saveDefaultTemplate() {
  if (!defaultTemplateId) {
    setError("Choose a default template first.");
    return;
  }

  if (!templates.some((template) => template.id === defaultTemplateId)) {
    setError("The selected default template does not exist.");
    return;
  }

  setSavingSettings(true);
  setError("");
  setNotice("");

  try {
    const result = await apiRequest("/api/email/settings", {
      method: "PUT",
      body: JSON.stringify({
        defaultTemplateId,
        attachmentTemplateId,
      }),
    });

    if (result.success !== true) {
      throw new Error(result.message || "Could not save default settings.");
    }

    const savedSettings = result.settings || result;

    if (savedSettings.defaultTemplateId !== defaultTemplateId) {
      throw new Error("The backend returned a different default template.");
    }

    // Do not change selectedTemplate, editorSubject, or editorBody here.
    setDefaultTemplateId(savedSettings.defaultTemplateId);

    setNotice(
      `Default template saved: ${
        templates.find((template) => template.id === defaultTemplateId)?.name ||
        defaultTemplateId
      }. The template content was not modified.`
    );
  } catch (err) {
    setError(`Unable to save default settings: ${err.message}`);
  } finally {
    setSavingSettings(false);
  }
}



  function validateForm() {
    if (!recipient.trim()) {
      return "Enter the recipient email address.";
    }

    if (!selected) {
      return "Please select an email template.";
    }

    if (!subject.trim()) {
      return "Please enter an email subject.";
    }

    // Prevent accidentally sending an unsaved template body.
    if (hasEditorChanges) {
      return "You have unsaved template changes. Save the template before sending.";
    }

    for (const key of selected.placeholders || []) {
      if (!String(variables[key] || "").trim()) {
        return `Please enter ${FIELD_LABELS[key] || key}.`;
      }

      if (
        (key === "CERTIFICATE_URL" ||
          key === "OFFER_LETTER_URL") &&
        !/^https:\/\/\S+$/i.test(String(variables[key]).trim())
      ) {
        return `${FIELD_LABELS[key] || key} must be a valid HTTPS URL.`;
      }
    }

    if (isOfferEmail && !offerPdf) {
      return "Please attach the student's personalized offer-letter PDF.";
    }

    if (offerPdf && offerPdf.type !== "application/pdf") {
      return "Only PDF offer-letter attachments are allowed.";
    }

    if (offerPdf && offerPdf.size > 10 * 1024 * 1024) {
      return "The PDF must be 10 MB or smaller.";
    }

    return "";
  }

  async function sendEmail(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSending(true);

    try {
      const formData = new FormData();

      formData.append("recipient", recipient.trim());
      formData.append("templateId", selectedTemplate);
      formData.append("subject", subject.trim());

      for (const key of selected.placeholders || []) {
        const value = String(variables[key] ?? "").trim();

        if (!value) {
          throw new Error(
            `Missing required field: ${FIELD_LABELS[key] || key}.`
          );
        }

        formData.append(key, value);
      }

      if (isOfferEmail && offerPdf) {
        formData.append("attachment", offerPdf);
      }

      const result = await apiRequest("/api/email/send", {
        method: "POST",
        body: formData,
      });

      setNotice(
        `${result.message || "Email sent successfully."} Recipient: ${
          result.recipient || recipient.trim()
        }. ${
          result.attachmentIncluded
            ? "Offer-letter PDF attached."
            : "No offer-letter PDF attached."
        }`
      );

      setRecipient("");
      setVariables({});
      setOfferPdf(null);

      const fileInput = document.getElementById("offer-pdf");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
            <Mail size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Email Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Edit, preview, save and send your AdNex Media email templates.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadTemplates}
          disabled={loading || sending || savingTemplate || savingSettings}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={16} />
          ) : (
            <RefreshCw size={16} />
          )}
          Refresh
        </button>
      </header>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          <CheckCircle size={18} className="mt-0.5 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {loading && templates.length === 0 ? (
        <div className="flex items-center gap-2 rounded-xl border bg-white p-8 text-gray-500">
          <LoaderCircle className="animate-spin" size={20} />
          Loading templates and settings...
        </div>
      ) : (
        <>
          {/* Template selection */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Email Templates
              </h2>
              <p className="text-sm text-gray-500">
                Select a template to edit it or compose an email.
              </p>
            </div>

            {templates.length === 0 ? (
              <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                No templates are available. Check your backend configuration.
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => chooseTemplate(template.id)}
                    disabled={sending || savingTemplate}
                    className={`rounded-xl border p-4 text-left transition ${
                      selectedTemplate === template.id
                        ? "border-purple-500 bg-purple-50 ring-1 ring-purple-200"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Mail
                          size={18}
                          className="shrink-0 text-purple-600"
                        />
                        <span className="font-semibold text-gray-900">
                          {template.name}
                        </span>
                      </div>

                      {defaultTemplateId === template.id && (
                        <Star
                          size={17}
                          className="shrink-0 fill-amber-400 text-amber-500"
                          aria-label="Default template"
                        />
                      )}
                    </div>

                    <p className="text-sm text-gray-500">
                      {template.subject}
                    </p>

                    {template.isCustomized && (
                      <span className="mt-3 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        Customized
                      </span>
                    )}

                    {template.id === OFFER_TEMPLATE_ID && (
                      <span className="mt-3 inline-block rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                        PDF required
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Default template settings */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Default Template Settings
            </h2>
            <p className="mb-4 mt-1 text-sm text-gray-500">
              Choose which template should be selected by default when this
              page loads.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                aria-label="Default email template"
                value={defaultTemplateId}
                onChange={(event) =>
                  setDefaultTemplateId(event.target.value)
                }
                disabled={savingSettings || loading}
                className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-purple-500"
              >
                <option value="">Choose default template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={saveDefaultTemplate}
                disabled={
                  savingSettings || loading || !defaultTemplateId
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {savingSettings ? (
                  <LoaderCircle className="animate-spin" size={17} />
                ) : (
                  <Save size={17} />
                )}
                Save Default
              </button>
            </div>
          </section>

          {selected && (
            <>
              {/* Template editor and preview */}
              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Edit Template
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {selected.name} — edit the subject or HTML, then save.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={saveTemplate}
                    disabled={
  savingTemplate ||
  loading ||
  !selected
}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingTemplate ? (
                      <LoaderCircle
                        className="animate-spin"
                        size={17}
                      />
                    ) : (
                      <Save size={17} />
                    )}
                    {savingTemplate ? "Saving..." : "Save Template"}
                  </button>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="editor-subject"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Template Subject
                  </label>
                  <input
                    id="editor-subject"
                    value={editorSubject}
                    onChange={(event) =>
                      setEditorSubject(event.target.value)
                    }
                    maxLength={200}
                    disabled={savingTemplate}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-purple-500 disabled:bg-gray-50"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="editor-body"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    HTML Template Body
                  </label>
                  <textarea
                    id="editor-body"
                    value={editorBody}
                    onChange={(event) =>
                      setEditorBody(event.target.value)
                    }
                    rows={18}
                    spellCheck={false}
                    disabled={savingTemplate}
                    placeholder="Paste or edit the HTML email template here..."
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm leading-6 outline-none focus:border-purple-500 disabled:opacity-60"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Keep placeholders such as {"{{STUDENT_NAME}}"} and{" "}
                    {"{{INTERNSHIP_DOMAIN}}"} exactly as expected by your
                    backend. Only supported placeholders can be saved.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-gray-50 p-3">
                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <Eye size={18} />
                      Template Preview
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewMode("preview")}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                          previewMode === "preview"
                            ? "bg-purple-600 text-white"
                            : "border bg-white text-gray-700"
                        }`}
                      >
                        <Eye size={15} />
                        Preview
                      </button>

                      <button
                        type="button"
                        onClick={() => setPreviewMode("source")}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                          previewMode === "source"
                            ? "bg-purple-600 text-white"
                            : "border bg-white text-gray-700"
                        }`}
                      >
                        <Code2 size={15} />
                        Source
                      </button>
                    </div>
                  </div>

                  {previewMode === "preview" ? (
                    <iframe
                      title={`${selected.name} HTML preview`}
                      srcDoc={previewHtml}
                      sandbox=""
                      referrerPolicy="no-referrer"
                      className="h-[650px] w-full bg-white"
                    />
                  ) : (
                    <pre className="max-h-[650px] overflow-auto whitespace-pre-wrap break-words bg-gray-950 p-4 text-xs leading-5 text-gray-100">
                      {editorBody}
                    </pre>
                  )}
                </div>

                {hasEditorChanges && (
                  <p className="mt-3 text-sm font-medium text-amber-700">
                    You have unsaved changes. Save the template before
                    sending an email.
                  </p>
                )}
              </section>

              {/* Compose and send */}
              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-1 text-lg font-semibold text-gray-900">
                  Compose and Send
                </h2>
                <p className="mb-5 text-sm text-gray-500">
                  Send a personalized email using the saved version of the
                  selected HTML template.
                </p>

                <form onSubmit={sendEmail} className="space-y-5">
                  <div>
                    <label
                      htmlFor="recipient-email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Recipient Email Address
                    </label>
                    <input
                      id="recipient-email"
                      type="email"
                      required
                      maxLength={254}
                      value={recipient}
                      onChange={(event) =>
                        setRecipient(event.target.value)
                      }
                      placeholder="student@example.com"
                      disabled={sending}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-purple-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="selected-template"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Selected Template
                    </label>
                    <select
                      id="selected-template"
                      required
                      value={selectedTemplate}
                      onChange={(event) =>
                        chooseTemplate(event.target.value)
                      }
                      disabled={sending || savingTemplate}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-purple-500 disabled:bg-gray-50"
                    >
                      <option value="">Choose template</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="email-subject"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Subject
                    </label>
                    <input
                      id="email-subject"
                      required
                      maxLength={200}
                      value={subject}
                      onChange={(event) =>
                        setSubject(event.target.value)
                      }
                      disabled={sending}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-purple-500 disabled:bg-gray-50"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This subject is used for the email you send. To change
                      the saved template subject, edit it above and save.
                    </p>
                  </div>

                  <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Personalization Details
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Fill in all placeholders required by this template.
                      </p>
                    </div>

                    {(selected.placeholders || []).map((key) => {
                      const isUrl =
                        key === "CERTIFICATE_URL" ||
                        key === "OFFER_LETTER_URL";

                      const isDate =
                        key === "START_DATE" ||
                        key === "END_DATE";

                      return (
                        <div key={key}>
                          <label
                            htmlFor={`variable-${key}`}
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            {FIELD_LABELS[key] ||
                              key.replaceAll("_", " ")}
                          </label>
                          <input
                            id={`variable-${key}`}
                            type={isUrl ? "url" : "text"}
                            required
                            maxLength={isUrl ? 2048 : 300}
                            value={variables[key] || ""}
                            onChange={(event) =>
                              updateVariable(key, event.target.value)
                            }
                            placeholder={
                              isUrl
                                ? "https://..."
                                : isDate
                                  ? "e.g. 15 October 2026"
                                  : `Enter ${
                                      FIELD_LABELS[key] || key
                                    }`
                            }
                            disabled={sending}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-purple-500 disabled:bg-gray-100"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {isOfferEmail && (
                    <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FileText
                          size={20}
                          className="text-purple-700"
                        />
                        <h3 className="font-semibold text-purple-900">
                          Personalized Offer Letter PDF
                        </h3>
                      </div>

                      <p className="mb-4 text-sm text-purple-800">
                        Attach the student's personalized offer-letter PDF.
                        The offer-letter link in the HTML template should
                        point to the appropriate HTTPS URL.
                      </p>

                      <label
                        htmlFor="offer-pdf"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Choose PDF (maximum 10 MB)
                      </label>

                      <input
                        id="offer-pdf"
                        type="file"
                        accept=".pdf,application/pdf"
                        required
                        disabled={sending}
                        onChange={(event) =>
                          setOfferPdf(event.target.files?.[0] || null)
                        }
                        className="block w-full rounded-lg border border-gray-300 bg-white text-sm file:mr-4 file:border-0 file:bg-purple-100 file:px-4 file:py-2.5 file:font-medium file:text-purple-800 hover:file:bg-purple-200 disabled:opacity-50"
                      />

                      {offerPdf && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                          <Paperclip size={16} />
                          <span className="break-all">
                            {offerPdf.name}
                          </span>
                          <span className="shrink-0 text-gray-500">
                            (
                            {(offerPdf.size / 1024 / 1024).toFixed(2)} MB
                            )
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {!isOfferEmail && (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                      This template will be sent without an offer-letter PDF
                      attachment.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      loading ||
                      sending ||
                      savingTemplate ||
                      hasEditorChanges ||
                      !selected ||
                      !recipient.trim() ||
                      !subject.trim()
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sending ? (
                      <LoaderCircle
                        className="animate-spin"
                        size={18}
                      />
                    ) : (
                      <Send size={18} />
                    )}
                    {sending ? "Sending Email..." : "Send Email"}
                  </button>
                </form>
              </section>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default EmailManagement;
