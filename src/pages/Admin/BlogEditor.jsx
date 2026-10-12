import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

const categories = [
  "Digital Marketing",
  "SEO",
  "Paid Ads",
  "Social Media",
  "Web Development",
  "Business Growth",
];

const initialForm = {
  title: "",
  slug: "",
  category: "Digital Marketing",
  excerpt: "",
  content: "",
  featured_image: "",
  date_published: "",
  read_time: "",
  author: "AdNex Media",
  featured: false,
  keywords: "",
  meta_title: "",
  meta_description: "",
  status: "draft",
};

export default function BlogEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading blog:", error);
        alert("Unable to load blog.");
        navigate("/admin/blogs");
        return;
      }

      setForm({
        title: data.title || "",
        slug: data.slug || "",
        category: data.category || "Digital Marketing",
        excerpt: data.excerpt || "",
        content: data.content || "",
        featured_image: data.featured_image || "",
        date_published: data.date_published || "",
        read_time: data.read_time || "",
        author: data.author || "AdNex Media",
        featured: data.featured || false,
        keywords: data.keywords?.join(", ") || "",
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        status: data.status || "draft",
      });

      setLoading(false);
    };

    fetchBlog();
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateSlug = () => {
    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setForm((current) => ({
      ...current,
      slug,
    }));
  };


  const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Please upload a JPG, PNG, or WebP image.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image size must be less than 5MB.");
    return;
  }

  setUploadingImage(true);

  try {
    const fileExtension = file.name.split(".").pop();

    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

    const filePath = `blogs/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Image upload error:", uploadError);
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    setForm((current) => ({
      ...current,
      featured_image: data.publicUrl,
    }));
  } catch (error) {
    console.error("Image upload error:", error);
    alert("Something went wrong while uploading the image.");
  } finally {
    setUploadingImage(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    if (!form.slug.trim()) {
      alert("Please enter a blog slug.");
      return;
    }

    if (!form.category) {
      alert("Please select a category.");
      return;
    }

    setSaving(true);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      category: form.category,
      excerpt: form.excerpt.trim(),
      content: form.content,
      featured_image: form.featured_image.trim(),
      date_published: form.date_published || null,
      read_time: form.read_time.trim(),
      author: form.author.trim() || "AdNex Media",
      featured: form.featured,
      keywords: form.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      meta_title: form.meta_title.trim(),
      meta_description: form.meta_description.trim(),
      status: form.status,
      updated_at: new Date().toISOString(),
    };

    let result;

    if (isEditing) {
      result = await supabase
        .from("blogs")
        .update(payload)
        .eq("id", id);
    } else {
      result = await supabase
        .from("blogs")
        .insert([
          {
            ...payload,
            created_at: new Date().toISOString(),
          },
        ]);
    }

    if (result.error) {
      console.error("Error saving blog:", result.error);
      alert(result.error.message);
      setSaving(false);
      return;
    }

    alert(
      isEditing
        ? "Blog updated successfully."
        : "Blog created successfully."
    );

    navigate("/admin/blogs");
  };

  if (loading) {
    return (
      <div className="px-4 py-10 text-center text-sm text-slate-500 sm:px-6">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl">
      <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="mb-3 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Blogs
          </button>

          <h2 className="break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            {isEditing ? "Edit Blog" : "Add New Blog"}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            {isEditing
              ? "Update your blog article."
              : "Create a new AdNex Media blog article."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
        {/* Basic Information */}
        <section className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Basic Information
          </h3>

          <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 sm:mt-6 sm:gap-6 md:grid-cols-2">
            <div className="min-w-0 md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Blog Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Slug
              </label>

              <div className="flex min-w-0 flex-col gap-2 xs:flex-row sm:flex-row">
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="blog-url-slug"
                  className="min-w-0 w-full flex-1 rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
                  required
                />

                <button
                  type="button"
                  onClick={generateSlug}
                  className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:w-auto"
                >
                  Generate
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0 md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Excerpt
              </label>

              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows="4"
                placeholder="Short description of the blog..."
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Blog Content
          </h3>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Content
            </label>

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="14"
              placeholder="Write your blog content here..."
              className="block min-w-0 w-full resize-y rounded-lg border border-slate-200 px-3 py-3 font-mono text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
            />

            <p className="mt-2 text-xs text-slate-400">
              Rich text editor can be added after the basic CMS is working.
            </p>
          </div>
        </section>

        {/* Publishing */}
        <section className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Publishing
          </h3>

          <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 sm:mt-6 sm:gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Publish Date
              </label>

              <input
                type="date"
                name="date_published"
                value={form.date_published}
                onChange={handleChange}
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Read Time
              </label>

              <input
                type="text"
                name="read_time"
                value={form.read_time}
                onChange={handleChange}
                placeholder="8 min read"
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="min-w-0 md:col-span-2">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300"
                />

                <span className="text-sm font-medium text-slate-700">
                  Mark as featured blog
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            SEO
          </h3>

          <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Keywords
              </label>

              <input
                type="text"
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                placeholder="SEO, digital marketing, Google ranking"
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
              />

              <p className="mt-2 text-xs text-slate-400">
                Separate keywords with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Meta Title
              </label>

              <input
                type="text"
                name="meta_title"
                value={form.meta_title}
                onChange={handleChange}
                placeholder="SEO title"
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Meta Description
              </label>

              <textarea
                name="meta_description"
                value={form.meta_description}
                onChange={handleChange}
                rows="4"
                placeholder="SEO meta description"
                className="block min-w-0 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:px-4"
              />
            </div>
          </div>
        </section>

        {/* Image */}
        {/* Featured Image */}
<section className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
  <h3 className="text-lg font-semibold text-slate-900">
    Featured Image
  </h3>

  <div className="mt-6">
    <label className="mb-3 block text-sm font-medium text-slate-700">
      Upload Image
    </label>

    <div className="flex min-w-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <label className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
        <Upload size={18} />

        {uploadingImage ? "Uploading..." : "Choose Image"}

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageUpload}
          disabled={uploadingImage}
          className="hidden"
        />
      </label>

      <p className="text-xs leading-5 text-slate-400">
        JPG, PNG or WebP · Maximum 5MB
      </p>
    </div>

    {form.featured_image && (
      <div className="relative mt-5 w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 sm:mt-6">
        <img
          src={form.featured_image}
          alt="Featured preview"
          className="h-auto w-full object-cover"
        />

        <button
          type="button"
          onClick={() =>
            setForm((current) => ({
              ...current,
              featured_image: "",
            }))
          }
          className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white shadow-lg transition hover:bg-red-600 sm:right-3 sm:top-3"
          title="Remove image"
        >
          <X size={16} />
        </button>
      </div>
    )}
  </div>
</section>

        {/* Actions */}
        <div className="sticky bottom-0 z-10 -mx-1 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 bg-slate-50/95 px-1 py-4 backdrop-blur sm:static sm:mx-0 sm:flex-row sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : isEditing
              ? "Update Blog"
              : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}