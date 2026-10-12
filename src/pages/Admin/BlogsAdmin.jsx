import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
  console.error("Error fetching blogs:", error);
  alert(error.message);
  setLoadingBlogs(false);
  return;
}

console.log("SUPABASE BLOGS:", data);

    setBlogs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete blog.");
      console.error(error);
      return;
    }

    setBlogs((current) =>
      current.filter((blog) => blog.id !== id)
    );
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchText = search.toLowerCase();

    return (
      blog.title?.toLowerCase().includes(searchText) ||
      blog.category?.toLowerCase().includes(searchText) ||
      blog.slug?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Blogs
          </h2>

          <p className="mt-2 text-slate-500">
            Manage your AdNex Media blog articles.
          </p>
        </div>

        <Link
          to="/admin/blogs/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add New Blog
        </Link>
      </div>

      {/* SEARCH */}

      <div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* BLOG TABLE */}

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading blogs...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No blogs found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Blog
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {blog.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          /blogs/{blog.slug}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                        {blog.category}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                          blog.status === "published"
                            ? "bg-green-50 text-green-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {blog.date_published || "-"}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/blogs/${blog.slug}`}
                          target="_blank"
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          title="View"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => deleteBlog(blog.id)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={17} />
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
    </div>
  );
}