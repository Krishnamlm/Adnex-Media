import { NavLink } from "react-router-dom";

export default function MobileMenu({ links, setMenuOpen }) {
  return (
    <div className="border-t border-gray-200 bg-white xl:hidden">
      <nav className="flex flex-col px-6 py-4">

        {/* Navigation Links */}
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `border-b border-gray-100 py-3 text-sm transition-colors ${
                isActive
                  ? "text-violet-500"
                  : "text-gray-700 hover:text-violet-500"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

        {/* Mobile CTA */}
        <NavLink
          to="/contact"
          onClick={() => setMenuOpen(false)}
          className=" mt-5 rounded-full bg-black px-6 py-3 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-violet-600"
        >
          Let's Collaborate
        </NavLink>

      </nav>
    </div>
  );
}