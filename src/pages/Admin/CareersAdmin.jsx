
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  BriefcaseBusiness,
  GraduationCap,
  X,
  Save,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

const EMPTY_JOB = {
  title: "",
  department: "General",
  employment_type: "Full Time",
  location: "Noida / Remote",
  experience: "0–2 Years",
  icon_name: "BriefcaseBusiness",
  description: "",
  skills: "",
  application_url: "https://forms.gle/EBnq7SXpwiaeDJYU9",
  status: "draft",
  display_order: 0,
};

const EMPTY_INTERNSHIP = {
  title: "",
  duration: "1–3 Months",
  mode: "Remote / Hybrid",
  icon_name: "Code2",
  description: "",
  skills: "",
  application_url: "https://forms.gle/EBnq7SXpwiaeDJYU9",
  status: "draft",
  display_order: 0,
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass =
  "mb-1.5 block text-sm font-medium text-slate-700";

export default function CareersAdmin() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_JOB);

  const isJobs = activeTab === "jobs";
  const tableName = isJobs
    ? "career_openings"
    : "career_internships";
  const records = isJobs ? jobs : internships;

  const fetchCareers = useCallback(async () => {
    setLoading(true);
    setError("");

    const [jobsResult, internshipsResult] = await Promise.all([
      supabase
        .from("career_openings")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),
      supabase
        .from("career_internships")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),
    ]);

    if (jobsResult.error || internshipsResult.error) {
      const message =
        jobsResult.error?.message ||
        internshipsResult.error?.message ||
        "Could not load career listings.";

      console.error("Career dashboard fetch error:", {
        jobs: jobsResult.error,
        internships: internshipsResult.error,
      });

      setError(message);
    } else {
      setJobs(jobsResult.data || []);
      setInternships(internshipsResult.data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(isJobs ? { ...EMPTY_JOB } : { ...EMPTY_INTERNSHIP });
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingId(record.id);
    setForm({
      ...(isJobs ? EMPTY_JOB : EMPTY_INTERNSHIP),
      ...record,
      skills: Array.isArray(record.skills)
        ? record.skills.join(", ")
        : "",
    });
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    setEditingId(null);
  };

  const saveRecord = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      icon_name: form.icon_name.trim() || (isJobs ? "BriefcaseBusiness" : "Code2"),
      description: form.description.trim(),
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      application_url: form.application_url.trim(),
      status: form.status,
      display_order: Number(form.display_order) || 0,
      updated_at: new Date().toISOString(),
    };

    if (isJobs) {
      Object.assign(payload, {
        department: form.department.trim() || "General",
        employment_type: form.employment_type,
        location: form.location.trim() || "Noida / Remote",
        experience: form.experience.trim() || "0–2 Years",
      });
    } else {
      Object.assign(payload, {
        duration: form.duration.trim() || "1–3 Months",
        mode: form.mode.trim() || "Remote / Hybrid",
      });
    }

    if (!payload.title) {
      setError("Please enter a title.");
      setSaving(false);
      return;
    }

    let result;

    if (editingId) {
      result = await supabase
        .from(tableName)
        .update(payload)
        .eq("id", editingId);
    } else {
      result = await supabase
        .from(tableName)
        .insert([payload]);
    }

    if (result.error) {
      console.error("Career save error:", result.error);
      setError(result.error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setModalOpen(false);
    setEditingId(null);
    await fetchCareers();
  };

  const toggleStatus = async (record) => {
    const nextStatus =
      record.status === "published" ? "draft" : "published";

    const { error: updateError } = await supabase
      .from(tableName)
      .update({
        status: nextStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", record.id);

    if (updateError) {
      console.error("Career status update error:", updateError);
      window.alert(`Could not update status: ${updateError.message}`);
      return;
    }

    await fetchCareers();
  };

  const deleteRecord = async (record) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${record.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .eq("id", record.id);

    if (deleteError) {
      console.error("Career delete error:", deleteError);
      window.alert(`Could not delete listing: ${deleteError.message}`);
      return;
    }

    await fetchCareers();
  };

  const filteredRecords = records.filter((record) => {
    const query = search.toLowerCase();

    return (
      record.title?.toLowerCase().includes(query) ||
      record.department?.toLowerCase().includes(query) ||
      record.employment_type?.toLowerCase().includes(query) ||
      record.location?.toLowerCase().includes(query) ||
      record.duration?.toLowerCase().includes(query) ||
      record.mode?.toLowerCase().includes(query) ||
      record.status?.toLowerCase().includes(query)
    );
  });

  const allRecords = [...jobs, ...internships];
  const publishedCount = allRecords.filter(
    (record) => record.status === "published"
  ).length;
  const draftCount = allRecords.filter(
    (record) => record.status !== "published"
  ).length;

  return (
    <div className="min-w-0 space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Career Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage job openings, internships and applications.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add {isJobs ? "Job Opening" : "Internship"}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Job Openings"
          value={jobs.length}
          icon={<BriefcaseBusiness size={20} />}
          color="blue"
        />
        <SummaryCard
          label="Internships"
          value={internships.length}
          icon={<GraduationCap size={20} />}
          color="violet"
        />
        <SummaryCard
          label="Published Listings"
          value={publishedCount}
          icon={<ExternalLink size={20} />}
          color="green"
          subtitle={`${draftCount} draft${draftCount === 1 ? "" : "s"}`}
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => {
            setActiveTab("jobs");
            setSearch("");
          }}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
            isJobs
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <BriefcaseBusiness size={17} />
          Job Openings ({jobs.length})
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("internships");
            setSearch("");
          }}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
            !isJobs
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <GraduationCap size={17} />
          Internships ({internships.length})
        </button>
      </div>

      {/* Search and refresh */}
      <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${isJobs ? "job openings" : "internships"}...`}
            className={`${inputClass} pl-10`}
          />
        </div>

        <button
          type="button"
          onClick={fetchCareers}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Fetch error */}
      {error && !modalOpen && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Could not load career listings.</p>
          <p className="mt-1 break-words">{error}</p>
          <button
            type="button"
            onClick={fetchCareers}
            className="mt-3 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Listings table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Loading career listings...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              {isJobs ? (
                <BriefcaseBusiness size={22} />
              ) : (
                <GraduationCap size={22} />
              )}
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">
              {search
                ? "No matching listings"
                : `No ${isJobs ? "job openings" : "internships"} yet`}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {search
                ? "Try a different search term."
                : "Add your first listing to get started."}
            </p>
            {!search && (
              <button
                type="button"
                onClick={openAddModal}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={16} />
                Add {isJobs ? "Job Opening" : "Internship"}
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Listing
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {isJobs ? "Employment" : "Duration / Mode"}
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Order
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-5">
                      <p className="font-semibold text-slate-900">
                        {record.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {isJobs
                          ? `${record.department || "General"} · ${record.location || "No location"}`
                          : `${record.mode || "Remote / Hybrid"}`}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-600">
                      {isJobs
                        ? record.employment_type
                        : record.duration}
                      <p className="mt-1 text-xs text-slate-400">
                        {isJobs
                          ? record.experience
                          : record.mode}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                          record.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {record.status === "published"
                          ? "Published"
                          : "Draft"}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-500">
                      {record.display_order ?? 0}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex justify-end gap-2">
                        {record.application_url && (
                          <a
                            href={record.application_url}
                            target="_blank"
                            rel="noreferrer"
                            title="Open application link"
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => openEditModal(record)}
                          title="Edit listing"
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleStatus(record)}
                          title={
                            record.status === "published"
                              ? "Unpublish"
                              : "Publish"
                          }
                          className={`rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold transition ${
                            record.status === "published"
                              ? "text-amber-700 hover:bg-amber-50"
                              : "text-green-700 hover:bg-green-50"
                          }`}
                        >
                          {record.status === "published"
                            ? "Unpublish"
                            : "Publish"}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteRecord(record)}
                          title="Delete listing"
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-3 sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit" : "Add"}{" "}
                  {isJobs ? "Job Opening" : "Internship"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Fill in the listing details below.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveRecord}>
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6">
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    {isJobs ? "Job Title" : "Internship Title"} *
                  </label>
                  <input
                    className={inputClass}
                    value={form.title}
                    onChange={(event) =>
                      updateForm("title", event.target.value)
                    }
                    placeholder={
                      isJobs
                        ? "e.g. Frontend Developer"
                        : "e.g. React Development Intern"
                    }
                    required
                  />
                </div>

                {isJobs ? (
                  <>
                    <FormField label="Department">
                      <input
                        className={inputClass}
                        value={form.department}
                        onChange={(event) =>
                          updateForm("department", event.target.value)
                        }
                        placeholder="Engineering"
                      />
                    </FormField>

                    <FormField label="Employment Type">
                      <select
                        className={inputClass}
                        value={form.employment_type}
                        onChange={(event) =>
                          updateForm("employment_type", event.target.value)
                        }
                      >
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                        <option>Freelance</option>
                      </select>
                    </FormField>

                    <FormField label="Location">
                      <input
                        className={inputClass}
                        value={form.location}
                        onChange={(event) =>
                          updateForm("location", event.target.value)
                        }
                        placeholder="Noida / Remote"
                      />
                    </FormField>

                    <FormField label="Experience">
                      <input
                        className={inputClass}
                        value={form.experience}
                        onChange={(event) =>
                          updateForm("experience", event.target.value)
                        }
                        placeholder="0–2 Years"
                      />
                    </FormField>
                  </>
                ) : (
                  <>
                    <FormField label="Duration">
                      <input
                        className={inputClass}
                        value={form.duration}
                        onChange={(event) =>
                          updateForm("duration", event.target.value)
                        }
                        placeholder="1–3 Months"
                      />
                    </FormField>

                    <FormField label="Mode">
                      <select
                        className={inputClass}
                        value={form.mode}
                        onChange={(event) =>
                          updateForm("mode", event.target.value)
                        }
                      >
                        <option>Remote / Hybrid</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>
                      </select>
                    </FormField>
                  </>
                )}

                <div className="sm:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y`}
                    value={form.description}
                    onChange={(event) =>
                      updateForm("description", event.target.value)
                    }
                    placeholder="Describe the role, responsibilities and requirements..."
                    rows={4}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Skills (comma-separated)
                  </label>
                  <input
                    className={inputClass}
                    value={form.skills}
                    onChange={(event) =>
                      updateForm("skills", event.target.value)
                    }
                    placeholder="React, JavaScript, CSS"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Application URL</label>
                  <input
                    className={inputClass}
                    type="url"
                    value={form.application_url}
                    onChange={(event) =>
                      updateForm("application_url", event.target.value)
                    }
                    placeholder="https://..."
                  />
                </div>

                <FormField label="Icon Name">
                  <input
                    className={inputClass}
                    value={form.icon_name}
                    onChange={(event) =>
                      updateForm("icon_name", event.target.value)
                    }
                    placeholder="BriefcaseBusiness"
                  />
                </FormField>

                <FormField label="Display Order">
                  <input
                    className={inputClass}
                    type="number"
                    value={form.display_order}
                    onChange={(event) =>
                      updateForm("display_order", event.target.value)
                    }
                  />
                </FormField>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Publication Status</label>
                  <select
                    className={inputClass}
                    value={form.status}
                    onChange={(event) =>
                      updateForm("status", event.target.value)
                    }
                  >
                    <option value="draft">Draft — hidden from public page</option>
                    <option value="published">Published — visible publicly</option>
                  </select>
                </div>

                {error && (
                  <div className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={16} />
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Create Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon, color, subtitle }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            colorClasses[color] || colorClasses.blue
          }`}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
      {subtitle && (
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}