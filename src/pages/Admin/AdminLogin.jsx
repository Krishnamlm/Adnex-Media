
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      navigate("/admin", { replace: true });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d20] px-4 py-10 font-sans text-white selection:bg-indigo-500/30">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />
      </div>

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#10172a]/80 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:grid-cols-2">
        {/* Left branding panel */}
<section className="relative hidden flex-col justify-between overflow-hidden border-r border-slate-200 bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-10 text-slate-900 lg:flex xl:p-12">

  {/* Decorative circles */}
  <div className="pointer-events-none absolute -right-20 top-28 h-64 w-64 rounded-full border border-indigo-400/20" />
  <div className="pointer-events-none absolute right-0 top-48 h-44 w-44 rounded-full border border-blue-400/20" />
  <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl" />

  <div className="relative z-10">
    {/* Official logo */}
    <div className="mb-12 flex items-center gap-3">
      <img
        src="https://www.adnexmedia.in/assets/logo-CYTt9L6o.png"
        alt="AdNex Media"
        className="h-12 w-auto max-w-[220px] object-contain object-left"
      />
    </div>

    {/* Access badge */}
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
      <span className="h-2 w-2 rounded-full bg-blue-600" />
      ADMINISTRATOR ACCESS
    </span>

    {/* Main heading */}
    <h2 className="mt-7 max-w-sm text-4xl font-semibold leading-[1.2] tracking-tight text-slate-900 xl:text-5xl">
      Everything you need.
      <span className="mt-2 block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
        One powerful workspace.
      </span>
    </h2>

    <p className="mt-6 max-w-sm text-sm leading-7 text-slate-600">
      Manage your digital presence, website content, blogs, careers,
      and business operations from one secure dashboard.
    </p>
  </div>

  {/* Security information */}
  <div className="relative z-10 mt-14 rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm shadow-slate-200/40 backdrop-blur-sm">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
        <ShieldCheck size={23} />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">
          Secure Admin Portal
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Protected with Supabase authentication
        </p>
      </div>
    </div>
  </div>

  {/* Footer */}
  <p className="relative z-10 mt-8 text-xs text-slate-500">
    © {new Date().getFullYear()} AdNex Media. All rights reserved.
  </p>
</section>



        {/* Login panel */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-14">
          <div className="w-full max-w-md">
            {/* Mobile branding */}
            
{/* Mobile branding — white top stripe */}
<div className="-mx-6 -mt-6 mb-8 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-4 sm:-mx-10 sm:-mt-10 sm:px-10 lg:hidden">
  <img
    src="https://www.adnexmedia.in/assets/logo-CYTt9L6o.png"
    alt="AdNex Media Logo"
    className="h-10 w-auto max-w-[190px] object-contain object-left"
  />

  <span className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
    Admin Portal
  </span>
</div>



            <div className="mb-9">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                <LockKeyhole size={27} strokeWidth={1.8} />
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">
                Welcome Back
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Sign in to your
                <span className="block mt-1 text-slate-300">
                  admin account.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Enter your credentials to access your workspace.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <div className="group relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400"
                  />

                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@adnexmedia.in"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-400/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="admin-password"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>
                </div>

                <div className="group relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400"
                  />

                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-400/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-slate-200"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-900/40 focus:outline-none focus:ring-4 focus:ring-indigo-400/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] uppercase tracking-wider text-slate-500">
                Restricted Access
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="flex items-start justify-center gap-2 text-center">
              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-emerald-400"
              />
              <p className="max-w-xs text-xs leading-5 text-slate-500">
                This portal is intended for authorized administrators only.
                Your account must have the appropriate admin permissions.
              </p>
            </div>

            <p className="mt-8 text-center text-xs text-slate-500 lg:hidden">
              © {new Date().getFullYear()} AdNex Media
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

