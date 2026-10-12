
import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  FileText,
  File,
  BriefcaseBusiness,
  Star,
  Users,
  Image,
  Search,
  Settings,
  ChevronRight,
  Globe,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  Mail,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Blogs",
    path: "/admin/blogs",
    icon: FileText,
  },
  {
    name: "Pages",
    path: "/admin/pages",
    icon: File,
  },
  {
    name: "Services",
    path: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    name: "Testimonials",
    path: "/admin/testimonials",
    icon: Star,
  },
  {
    name: "Careers",
    path: "/admin/careers",
    icon: Users,
  },

  {
  name: "Offer Letters",
  path: "/admin/offer-letters",
  icon: Mail,
},


{
  name: "Email Management",
  path: "/admin/email-management",
  icon: Mail,
},

  
  {
    name: "Media",
    path: "/admin/media",
    icon: Image,
  },
  {
    name: "SEO",
    path: "/admin/seo",
    icon: Search,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
  
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const activeItem =
    menuItems.find(
      (item) =>
        item.path === "/admin"
          ? location.pathname === "/admin"
          : location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`)
    ) || menuItems[0];

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-800">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200 bg-white transition-all duration-200 ${
          collapsed ? "lg:w-[82px]" : "lg:w-[250px]"
        } ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex h-[76px] shrink-0 items-center justify-between border-b border-slate-100 px-5 ${
            collapsed ? "lg:justify-center lg:px-2" : ""
          }`}
        >
          <NavLink
            to="/admin"
            onClick={closeSidebar}
            className="flex min-w-0 items-center gap-3"
          >
            <img
  src="https://www.adnexmedia.in/assets/logo-CYTt9L6o.png"
  alt="AdNex Media Logo"
  className={`h-10 w-auto max-w-full shrink-0 object-contain ${
    collapsed ? "lg:mx-auto" : ""
  }`}
/>
          </NavLink>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6 sm:px-4">
          <p
            className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 ${
              collapsed ? "lg:px-0 lg:text-center" : ""
            }`}
          >
            {collapsed ? (
              <span className="lg:hidden">Main menu</span>
            ) : (
              "Main menu"
            )}
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={closeSidebar}
                  title={collapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ${
                      collapsed
                        ? "lg:justify-center lg:px-2"
                        : ""
                    } ${
                      isActive
                        ? "bg-indigo-50 font-semibold text-indigo-700"
                        : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-indigo-600" />
                      )}

                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        className={`shrink-0 ${
                          isActive
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-slate-700"
                        }`}
                      />

                      <span
                        className={`min-w-0 flex-1 ${
                          collapsed ? "lg:hidden" : ""
                        }`}
                      >
                        {item.name}
                      </span>

                      {isActive && !collapsed && (
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Website preview card */}
          <div
            className={`mt-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-4 ${
              collapsed ? "lg:hidden" : ""
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <Globe size={18} />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-800">
              Your website
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Preview your live AdNex Media website.
            </p>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              Visit website
              <ChevronRight size={14} />
            </a>
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="shrink-0 border-t border-slate-100 p-3 sm:p-4">
          <div
            className={`flex items-center gap-3 rounded-xl bg-slate-50 p-3 ${
              collapsed ? "lg:justify-center lg:px-1" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
              <ShieldCheck size={18} />
            </div>

            <div
              className={`min-w-0 flex-1 ${
                collapsed ? "lg:hidden" : ""
              }`}
            >
              <p className="truncate text-sm font-semibold text-slate-800">
                Administrator
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Admin access
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              title="Logout"
              aria-label="Logout"
              className={`rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50 ${
                collapsed ? "lg:hidden" : ""
              }`}
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main application */}
      <div
        className={`min-h-screen transition-[padding] duration-200 ${
          collapsed ? "lg:pl-[82px]" : "lg:pl-[250px]"
        }`}
      >
        {/* Top navigation */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-3 border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            >
              <Menu size={19} />
            </button>

            {/* Collapse desktop sidebar */}
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={
                collapsed ? "Expand sidebar" : "Collapse sidebar"
              }
              className="hidden rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50 lg:inline-flex"
            >
              {collapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span className="truncate">{activeItem.name}</span>
              </div>
              <p className="mt-1 hidden text-xs text-slate-400 sm:block">
                AdNex Media / Control panel
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 sm:px-4"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">Live website</span>
            </a>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50 sm:px-4"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">
                {loggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>
          </div>
        </header>

        {/* Nested page content */}
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="mx-4 flex flex-col gap-2 border-t border-slate-200/80 py-5 text-xs text-slate-400 sm:mx-6 sm:flex-row sm:items-center sm:justify-between lg:mx-8">
          <span>© {new Date().getFullYear()} AdNex Media</span>
          <span>Admin workspace · Content management</span>
        </footer>
      </div>
    </div>
  );
}

