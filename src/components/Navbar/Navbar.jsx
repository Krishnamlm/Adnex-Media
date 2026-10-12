import { useState } from "react";
import { NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/images/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Performance", path: "/performance" },
    { name: "SEO & Growth", path: "/seo" },
    { name: "Paid Ads", path: "/paid-ads" },
    { name: "Web Dev", path: "/web-development" },
    { name: "Mobile Apps", path: "/mobile-apps" },
    { name: "Social Media", path: "/social-media" },
    { name: "Blogs", path: "/blogs" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">

      <div className="mx-auto flex h-[65px] w-full max-w-[1440px] items-center px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex shrink-0 items-center"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={logo}
            alt="Adnex Technologies"
            className="h-10 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden xl:flex flex-1 items-center justify-center gap-5">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `whitespace-nowrap text-[12px] font-normal transition-colors duration-300 ${
                  isActive
                    ? "text-violet-600"
                    : "text-gray-700 hover:text-violet-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="ml-auto hidden xl:flex shrink-0 items-center">
          <NavLink
            to="/contact"
            className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/20"
          >
            Let's Collaborate
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="ml-auto flex h-10 w-10 items-center justify-center text-3xl leading-none text-gray-900 xl:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <MobileMenu
          links={links}
          setMenuOpen={setMenuOpen}
        />
      )}

    </header>
  );
}