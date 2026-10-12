
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
  RefreshCw,
  Globe,
  Smartphone,
  Target,
  Megaphone,
  Users,
  TrendingUp,
  Share2,
  Palette,
  BriefcaseBusiness,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const iconOptions = {
  Globe,
  Smartphone,
  Target,
  Megaphone,
  Users,
  TrendingUp,
  Share2,
  Palette,
  BriefcaseBusiness,
};

const emptyService = {
  title: "",
  slug: "",
  icon_name: "Globe",
  tag: "",
  price: "Custom Pricing",
  description: "",
  features: "",
  display_order: 1,
  status: "draft",
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-slate-700";

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyService);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const slugify = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const openNewForm = () => {
    setEditingId(null);
    setForm({
      ...emptyService,
      display_order: services.length + 1,
    });
    setError("");
    setNotice("");
    setFormOpen(true);
  };

  const openEditForm = (service) => {
    setEditingId(service.id);

    setForm({
      title: service.title || "",
      slug: service.slug || "",
      icon_name: service.icon_name || "Globe",
      tag: service.tag || "",
      price: service.price || "Custom Pricing",
      description: service.description || "",
      features: (service.features || []).join("\n"),
      display_order: service.display_order ?? 1,
      status: service.status || "draft",
    });

    setError("");
    setNotice("");
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    if (saving) return;

    setFormOpen(false);
    setEditingId(null);
    setForm(emptyService);
    setError("");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    const title = form.title.trim();
    const slug = slugify(form.slug || title);

    const features = form.features
      .split("\n")
      .map((feature) => feature.trim())
      .filter(Boolean);

    if (!title || !slug || !form.description.trim()) {
      setError("Please enter the title, slug, and description.");
      return;
    }

    if (features.length === 0) {
      setError("Please add at least one service feature.");
      return;
    }

    setSaving(true);

    const payload = {
      title,
      slug,
      icon_name: form.icon_name,
      tag: form.tag.trim(),
      price: form.price.trim() || "Custom Pricing",
      description: form.description.trim(),
      features,
      display_order: Math.max(
        0,
        Number(form.display_order) || 0
      ),
      status: form.status,
      updated_at: new Date().toISOString(),
    };

    let result;

    if (editingId) {
      result = await supabase
        .from("services")
        .update(payload)
        .eq("id", editingId)
        .select()
        .single();
    } else {
      result = await supabase
        .from("services")
        .insert(payload)
        .select()
        .single();
    }

    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setNotice(
      editingId
        ? "Service updated successfully."
        : "Service created successfully."
    );

    setFormOpen(false);
    setEditingId(null);
    setForm(emptyService);

    await fetchServices();
  };

  const toggleStatus = async (service) => {
    const nextStatus =
      service.status === "published" ? "draft" : "published";

    const confirmed = window.confirm(
      nextStatus === "published"
        ? `Publish "${service.title}" on your website?`
        : `Unpublish "${service.title}" from your website?`
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    const { error: updateError } = await supabase
      .from("services")
      .update({
        status: nextStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", service.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setNotice(
      nextStatus === "published"
        ? "Service published."
        : "Service moved to drafts."
    );

    await fetchServices();
  };

  const deleteService = async (service) => {
    const confirmed = window.confirm(
      `Delete "${service.title}" permanently? This cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    const { error: deleteError } = await supabase
      .from("services")
      .delete()
      .eq("id", service.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setServices((current) =>
      current.filter((item) => item.id !== service.id)
    );

    setNotice("Service deleted successfully.");
  };

  const filteredServices = services.filter((service) => {
    const query = search.toLowerCase().trim();

    return (
      service.title?.toLowerCase().includes(query) ||
      service.slug?.toLowerCase().includes(query) ||
      service.tag?.toLowerCase().includes(query) ||
      service.status?.toLowerCase().includes(query)
    );
  });

  const publishedCount = services.filter(
    (service) => service.status === "published"
  ).length;

  const draftCount = services.length - publishedCount;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span>
            <span>/</span>
            <span className="text-blue-600">Services</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Services Management
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage the services displayed on your AdNex Media website.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewForm}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
        >
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1 break-words">{error}</div>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
        >
          <CheckCircle2 size={19} className="shrink-0" />
          <span className="min-w-0 flex-1 break-words">{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total Services",
            value: services.length,
            icon: BriefcaseBusiness,
            color: "blue",
          },
          {
            label: "Published",
            value: publishedCount,
            icon: Eye,
            color: "emerald",
          },
          {
            label: "Drafts",
            value: draftCount,
            icon: FileTextIcon,
            color: "amber",
          },
        ].map((item) => {
          const Icon = item.icon;

          const colors = {
            blue: "bg-blue-50 text-blue-600",
            emerald: "bg-emerald-50 text-emerald-600",
            amber: "bg-amber-50 text-amber-600",
          };

          return (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors[item.color]}`}
              >
                <Icon size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Form */}
      {formOpen && (
        <section
          id="service-form"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-5 sm:px-6">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Service" : "Add New Service"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the details for your service.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
              className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6 p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Service Title *</label>
                <input
                  required
                  maxLength={120}
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((current) => ({
                      ...current,
                      title,
                      slug: editingId
                        ? current.slug
                        : slugify(title),
                    }));
                  }}
                  placeholder="Website Development"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>URL Slug *</label>
                <div className="flex min-w-0 items-stretch">
                  <span className="flex shrink-0 items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-xs text-slate-500">
                    /services/
                  </span>
                  <input
                    required
                    value={form.slug}
                    onChange={(e) =>
                      updateField("slug", slugify(e.target.value))
                    }
                    placeholder="website-development"
                    className={`${inputClass} rounded-l-none`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Service Icon</label>
                <select
                  value={form.icon_name}
                  onChange={(e) =>
                    updateField("icon_name", e.target.value)
                  }
                  className={inputClass}
                >
                  {Object.keys(iconOptions).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-500">
                  Choose an icon for the service card.
                </p>
              </div>

              <div>
                <label className={labelClass}>Badge / Tag</label>
                <input
                  value={form.tag}
                  onChange={(e) => updateField("tag", e.target.value)}
                  placeholder="From ₹15,000"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Investment / Price</label>
                <input
                  value={form.price}
                  onChange={(e) =>
                    updateField("price", e.target.value)
                  }
                  placeholder="₹15,000 - ₹1,50,000"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Display Order</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.display_order}
                  onChange={(e) =>
                    updateField("display_order", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Description *</label>
                <textarea
                  required
                  rows={3}
                  maxLength={1000}
                  value={form.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  placeholder="Describe what this service offers..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>
                  Features *{" "}
                  <span className="font-normal text-slate-400">
                    (one feature per line)
                  </span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.features}
                  onChange={(e) =>
                    updateField("features", e.target.value)
                  }
                  placeholder={
                    "Custom UI/UX Design\nResponsive Design\nSEO Optimized"
                  }
                  className={`${inputClass} resize-y`}
                />
                <p className="mt-2 text-xs text-slate-500">
                  Each line becomes a separate feature on the service card.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Publication Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField("status", e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="draft">Draft — hidden from website</option>
                  <option value="published">
                    Published — visible on website when connected
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={17} />
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Service"
                    : "Create Service"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Search */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              aria-label="Search services"
              className={`${inputClass} pl-11`}
            />
          </div>

          <button
            type="button"
            onClick={fetchServices}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </section>

      {/* Services Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <h2 className="font-bold text-slate-900">All Services</h2>
          <p className="text-sm text-slate-500">
            {filteredServices.length}{" "}
            {filteredServices.length === 1 ? "service" : "services"}
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Loading services...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center">
            <BriefcaseBusiness
              size={32}
              className="mx-auto text-slate-300"
            />
            <p className="mt-3 font-semibold text-slate-700">
              No services found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try another search or add a new service.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {["Service", "Price", "Order", "Status", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {filteredServices.map((service) => {
                  const Icon =
                    iconOptions[service.icon_name] || BriefcaseBusiness;

                  const published = service.status === "published";

                  return (
                    <tr
                      key={service.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex max-w-sm items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Icon size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-900">
                              {service.title}
                            </p>
                            <p className="mt-1 truncate text-xs text-slate-400">
                              {service.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-700">
                          {service.price || "Custom Pricing"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {service.tag || "No tag"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {service.display_order}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            published
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              published ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {published ? "Published" : "Draft"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => toggleStatus(service)}
                            title={
                              published ? "Unpublish" : "Publish"
                            }
                            aria-label={
                              `${published ? "Unpublish" : "Publish"} ${service.title}`
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            {published ? (
                              <EyeOff size={17} />
                            ) : (
                              <Eye size={17} />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => openEditForm(service)}
                            title="Edit service"
                            aria-label={`Edit ${service.title}`}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteService(service)}
                            title="Delete service"
                            aria-label={`Delete ${service.title}`}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function FileTextIcon(props) {
  return <BriefcaseBusiness {...props} />;
}