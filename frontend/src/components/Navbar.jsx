import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Store this during login

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          FieldTrust
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {!token && (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Sign Up
              </Link>
            </>
          )}

          {token && (
            <>
              {role === "CUSTOMER" && (
                <Link to="/customer/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </Link>
              )}
              {role === "PROVIDER" && (
                <Link to="/provider/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Provider Panel
                </Link>
              )}
              {role === "ADMIN" && (
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3 px-6 space-y-4">

          {!token && (
            <>
              <Link to="/" className="block text-gray-700 hover:text-blue-600 font-medium">Login</Link>
              <Link to="/signup" className="block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">Sign Up</Link>
            </>
          )}

          {token && (
            <>
              {role === "CUSTOMER" && (
                <Link to="/customer/dashboard" className="block text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </Link>
              )}
              {role === "PROVIDER" && (
                <Link to="/provider/dashboard" className="block text-gray-700 hover:text-blue-600 font-medium">
                  Provider Panel
                </Link>
              )}
              {role === "ADMIN" && (
                <Link to="/admin/dashboard" className="block text-gray-700 hover:text-blue-600 font-medium">
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg font-medium"
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
