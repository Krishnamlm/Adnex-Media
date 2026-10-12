
import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  ArrowUpRight,
  FileText,
  Layers3,
  BriefcaseBusiness,
  MessageSquareQuote,
  Plus,
  Globe,
  ChevronRight,
  LayoutGrid,
  Clock3,
  CheckCircle2,
  CircleHelp,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalCareers, setTotalCareers] = useState(0);
  const [totalTestimonials, setTotalTestimonials] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchDashboardCounts = async () => {
    setLoading(true);

    try {
      const results = await Promise.all([
        supabase
          .from("blogs")
          .select("id", { count: "exact", head: true }),

        supabase
          .from("services")
          .select("id", { count: "exact", head: true }),

        supabase
          .from("career_openings")
          .select("id", { count: "exact", head: true })
          .eq("status", "published"),

        supabase
          .from("career_internships")
          .select("id", { count: "exact", head: true })
          .eq("status", "published"),

        supabase
          .from("testimonials")
          .select("id", { count: "exact", head: true }),
      ]);

      const [blogs, services, jobs, internships, testimonials] =
        results;

      if (blogs.error) {
        console.error("Blog count:", blogs.error);
      } else {
        setTotalBlogs(blogs.count ?? 0);
      }

      if (services.error) {
        console.error("Services count:", services.error);
      } else {
        setTotalServices(services.count ?? 0);
      }

      if (jobs.error) console.error("Jobs count:", jobs.error);
      if (internships.error) {
        console.error("Internships count:", internships.error);
      }

      if (!jobs.error && !internships.error) {
        setTotalCareers(
          (jobs.count ?? 0) + (internships.count ?? 0)
        );
      }

      if (testimonials.error) {
        console.error("Testimonials count:", testimonials.error);
      } else {
        setTotalTestimonials(testimonials.count ?? 0);
      }
    } catch (error) {
      console.error("Dashboard loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  const stats = [
    {
      label: "Total blogs",
      value: totalBlogs,
      note: "Articles & publications",
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
      dot: "bg-blue-500",
      href: "/admin/blogs",
    },
    {
      label: "Services",
      value: totalServices,
      note: "Available service pages",
      icon: Layers3,
      color: "bg-violet-50 text-violet-600",
      dot: "bg-violet-500",
      href: "/admin/services",
    },
    {
      label: "Career listings",
      value: totalCareers,
      note: "Published jobs & internships",
      icon: BriefcaseBusiness,
      color: "bg-emerald-50 text-emerald-600",
      dot: "bg-emerald-500",
      href: "/admin/careers",
    },
    {
      label: "Testimonials",
      value: totalTestimonials,
      note: "Client reviews",
      icon: MessageSquareQuote,
      color: "bg-orange-50 text-orange-600",
      dot: "bg-orange-500",
      href: "/admin/testimonials",
    },
  ];

  const actions = [
    {
      title: "Create a blog",
      description: "Write and publish a new article",
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
      href: "/admin/blogs/new",
    },
    {
      title: "Manage services",
      description: "Update your website services",
      icon: Layers3,
      color: "bg-violet-50 text-violet-600",
      href: "/admin/services",
    },
    {
      title: "Career openings",
      description: "Manage jobs and internships",
      icon: BriefcaseBusiness,
      color: "bg-emerald-50 text-emerald-600",
      href: "/admin/careers",
    },
  ];

  const filteredStats = stats.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const contentTotal =
    totalBlogs + totalServices + totalCareers + totalTestimonials;

  const getPercentage = (value) => {
    if (!contentTotal) return 0;
    return Math.round((value / contentTotal) * 100);
  };

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-full w-full min-w-0 bg-[#f7f8fa] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">

        {/* Header */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
              <LayoutGrid size={15} />
              <span>Workspace</span>
              <ChevronRight size={13} />
              <span className="text-slate-800">Dashboard</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Good day, Admin
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Here&apos;s what&apos;s happening with your website today.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-500">
              <Clock3 size={15} />
              <span>{formattedDate}</span>
            </div>

            <button
              type="button"
              onClick={fetchDashboardCounts}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search dashboard statistics..."
              aria-label="Search dashboard statistics"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#252c3b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#343d50] sm:self-auto"
          >
            <Globe size={16} />
            View website
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Statistics */}
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A summary of your website content.
              </p>
            </div>

            <span className="hidden rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 sm:inline-flex">
              Database statistics
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredStats.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_28px_rgba(15,23,42,0.05)] sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-500">
                      {item.label}
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon size={19} strokeWidth={1.8} />
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    {loading ? (
                      <div className="h-9 w-16 animate-pulse rounded-lg bg-slate-100" />
                    ) : (
                      <span className="text-3xl font-semibold tracking-tight text-slate-900">
                        {item.value.toLocaleString("en-IN")}
                      </span>
                    )}

                    <ArrowUpRight
                      size={17}
                      className="mb-1 text-slate-300 transition group-hover:text-indigo-600"
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                    <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                    <p className="text-xs text-slate-500">
                      {item.note}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {!filteredStats.length && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              No statistics match &quot;{search}&quot;.
            </div>
          )}
        </section>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">

          {/* Content overview */}
          <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 xl:col-span-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Content overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Distribution of your website content.
                </p>
              </div>

              <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
                All content
              </span>
            </div>

            <div className="mt-6 rounded-xl bg-[#fafbfc] p-4 sm:p-5">
              <p className="text-sm text-slate-500">
                Total managed items
              </p>

              <div className="mt-1 flex flex-wrap items-baseline gap-2">
                {loading ? (
                  <div className="h-9 w-20 animate-pulse rounded bg-slate-200" />
                ) : (
                  <span className="text-3xl font-semibold tracking-tight text-slate-900">
                    {contentTotal.toLocaleString("en-IN")}
                  </span>
                )}

                <span className="text-xs text-slate-400">
                  across four categories
                </span>
              </div>

              <div className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      width: `${getPercentage(item.value)}%`,
                    }}
                    className={`${item.dot} transition-all duration-500`}
                    title={`${item.label}: ${item.value}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {stats.map((item) => {
                const Icon = item.icon;
                const percentage = getPercentage(item.value);

                return (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                        >
                          <Icon size={16} />
                        </span>

                        <span className="truncate text-sm font-medium text-slate-700">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-sm font-semibold text-slate-800">
                          {loading ? "—" : item.value}
                        </span>
                        <span className="w-10 text-right text-xs text-slate-400">
                          {loading ? "—" : `${percentage}%`}
                        </span>
                      </div>
                    </div>

                    <div className="ml-10 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        style={{
                          width: `${loading ? 0 : percentage}%`,
                        }}
                        className={`h-full rounded-full ${item.dot} transition-all duration-500`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <p className="text-xs leading-5 text-slate-400">
                Counts are retrieved from Supabase. Career totals include
                published job openings and internships.
              </p>
            </div>
          </section>

          {/* Quick actions */}
          <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 xl:col-span-2">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Quick actions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Shortcuts to manage your website.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {actions.map((action) => {
                const Icon = action.icon;

                return (
                  <a
                    key={action.title}
                    href={action.href}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-200/80 p-3.5 transition hover:border-indigo-200 hover:bg-indigo-50/40 sm:p-4"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.color}`}
                    >
                      <Icon size={18} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800">
                        {action.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {action.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-600"
                    />
                  </a>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl border border-dashed border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={18} />
                </span>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Content management
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your dashboard brings blogs, services and career
                    listings together in one workspace.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <Globe size={16} />
              Preview live website
              <ArrowUpRight size={15} />
            </a>
          </section>
        </div>

        {/* Bottom information */}
        <section className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <CircleHelp size={19} />
            </span>

            <div>
              <p className="text-sm font-medium text-slate-800">
                Need to update your website?
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Choose a section above to manage your content.
              </p>
            </div>
          </div>

          <a
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-indigo-600 transition hover:text-indigo-800 sm:self-auto"
          >
            Manage content
            <ArrowUpRight size={15} />
          </a>
        </section>

        <footer className="flex flex-col gap-2 pb-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>AdNex Media · Admin Workspace</span>
          <span>Content management dashboard</span>
        </footer>
      </div>
    </div>
  );
}

