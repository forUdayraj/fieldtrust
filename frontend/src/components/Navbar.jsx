import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role || null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
        >
          FieldTrust
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">

          {!token && (
            <>
              <Link className="text-gray-700 hover:text-teal-600 font-medium transition" to="/">
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 bg-teal-600 text-white rounded-xl font-semibold
                           hover:bg-teal-700 transition shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}

          {token && (
            <>
              {role === "CUSTOMER" && (
                <Link
                  to="/customer/dashboard"
                  className="text-gray-700 hover:text-teal-600 font-medium transition"
                >
                  Dashboard
                </Link>
              )}

              {role === "PROVIDER" && (
                <Link
                  to="/provider/dashboard"
                  className="text-gray-700 hover:text-teal-600 font-medium transition"
                >
                  Provider Panel
                </Link>
              )}

              {role === "ADMIN" && (
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-teal-600 font-medium transition"
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-xl font-semibold 
                           hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-3xl font-bold"
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">

          {!token && (
            <>
              <Link
                to="/"
                className="block text-gray-700 hover:text-teal-600 font-medium transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="block w-full text-center bg-teal-600 text-white py-2 rounded-xl 
                           font-semibold hover:bg-teal-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}

          {token && (
            <>
              {role === "CUSTOMER" && (
                <Link
                  to="/customer/dashboard"
                  className="block text-gray-700 hover:text-teal-600 font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              {role === "PROVIDER" && (
                <Link
                  to="/provider/dashboard"
                  className="block text-gray-700 hover:text-teal-600 font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Provider Panel
                </Link>
              )}

              {role === "ADMIN" && (
                <Link
                  to="/admin/dashboard"
                  className="block text-gray-700 hover:text-teal-600 font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-xl font-semibold 
                           hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
