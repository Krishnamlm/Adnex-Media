import React from "react";
import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Performance", path: "/performance" },
    { name: "SEO & Growth", path: "/seo" },
    { name: "Paid Ads", path: "/paid-ads" },
    { name: "Web Development", path: "/web-development" },
  ];

  const services = [
    { name: "Mobile App Development", path: "/mobile-apps" },
    { name: "Social Media", path: "/social-media" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#070719] text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* ================= CTA ================= */}
        <div className="mb-16 flex flex-col justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end">

          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Let's Work Together
            </p>

            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Ready to grow your
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                digital presence?
              </span>
            </h2>

          </div>

          <Link
            to="/contact"
            className="group flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 font-semibold text-[#070719] transition-all duration-300 hover:bg-violet-500 hover:text-white"
          >
            Start a Project

            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

        </div>

        {/* ================= MAIN FOOTER ================= */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}
          <div>

            <Link to="/" className="inline-block">

              <h3 className="text-3xl font-black tracking-tight">
                ADNEX<span className="text-violet-400"></span>
              </h3>

              <p className="mt-1 text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                Media
              </p>

            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400">
              Digital Growth. Creative Impact. Real Results. We help ambitious
              brands build, grow and scale through powerful digital strategies.
            </p>

            {/* ================= SOCIAL LINKS ================= */}
            <div className="mt-7 flex gap-3">

              <a
                href="https://www.instagram.com/adnexindia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-bold text-gray-400 transition-all duration-300 hover:border-violet-400 hover:bg-violet-500/10 hover:text-violet-400"
              >
                IG
              </a>

              <a
                href="https://www.linkedin.com/company/107935885/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-bold text-gray-400 transition-all duration-300 hover:border-violet-400 hover:bg-violet-500/10 hover:text-violet-400"
              >
                in
              </a>

            </div>

          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>

            <h4 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
              Quick Links
            </h4>

            <ul className="space-y-4">

              {quickLinks.map((link) => (

                <li key={link.name}>

                  <Link
                    to={link.path}
                    className="group flex w-fit items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
                  >

                    <span>{link.name}</span>

                    <ArrowRight
                      size={14}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />

                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* ================= SERVICES ================= */}
          <div>

            <h4 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
              Services
            </h4>

            <ul className="space-y-4">

              {services.map((service) => (

                <li key={service.name}>

                  <Link
                    to={service.path}
                    className="text-sm text-gray-400 transition-colors duration-300 hover:text-violet-400"
                  >
                    {service.name}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* ================= CONTACT ================= */}
          <div>

            <h4 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
              Get In Touch
            </h4>

            <div className="space-y-6">

              {/* Email */}
              <a
                href="mailto:adnextechnologies@gmail.com"
                className="group flex items-start gap-3"
              >

                <Mail
                  size={18}
                  className="mt-1 shrink-0 text-violet-400"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-gray-300 transition-colors group-hover:text-white">
                    adnextechnologies@gmail.com
                  </p>

                </div>

              </a>
{/*
<a
  href="tel:+916265279245"
  className="group flex items-start gap-3"
>

  <Phone
    size={18}
    className="mt-1 shrink-0 text-violet-400"
  />

  <div>

    <p className="text-xs text-gray-500">
      Phone
    </p>

    <p className="mt-1 text-sm text-gray-300 transition-colors group-hover:text-white">
      +91 6265279245
    </p>

  </div>

</a>
*/}

              {/* Location */}
              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-violet-400"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    Noida, India
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 text-sm md:flex-row md:items-center">

          <p className="text-gray-500">
            © {new Date().getFullYear()} Adnex Media. All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <Link
              to="/privacy-policy"
              className="text-gray-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-500 transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;