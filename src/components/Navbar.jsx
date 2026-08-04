import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../Auth/AuthService.jsx";

export default function NavBar() {
  const { count } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-md transition ${
      isActive
        ? "text-amber-700 font-semibold"
        : "text-gray-600 hover:text-amber-700"
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

      
          <NavLink
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-amber-700"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 text-white">
              B
            </span>
            BookVerse
          </NavLink>

      
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/books" className={navClass}>
              Books
            </NavLink>

            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
          </nav>

    
          <div className="flex items-center gap-5">

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  Hi, <span className="font-semibold">{user.name.split(" ")[0]}</span>
                </span>

                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="rounded-lg bg-amber-700 px-4 py-2 text-white hover:bg-amber-800 transition"
              >
                Sign In
              </NavLink>
            )}
            <NavLink
              to="/cart"
              className="relative text-gray-700 hover:text-amber-700 transition"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="9" cy="21" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="19" cy="21" r="1.5" fill="currentColor" stroke="none" />
                <path d="M2 3h2l2.6 12.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21 7H6" />
              </svg>

              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {count}
                </span>
              )}
            </NavLink>

          </div>
        </div>
      </div>
    </header>
  );
}