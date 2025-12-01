import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", { email, password });
      const token = res.data.token;

      const loggedUser = res.data.user || res.data.provider || res.data.admin;

      if (!loggedUser) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("token", token);

      const user = {
        id: loggedUser.id,
        name: loggedUser.name,
        email: loggedUser.email,
        role: loggedUser.role,
      };

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "CUSTOMER") navigate("/customer/dashboard");
      if (user.role === "PROVIDER") navigate("/provider/dashboard");
      if (user.role === "ADMIN") navigate("/admin/dashboard");

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-teal-50 via-white to-cyan-50 px-6">

      <div className="w-full max-w-4xl">

        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Welcome back
        </h1>
        <p className="text-gray-600 mb-10">
          Sign in to access your FieldTrust account.
        </p>

        {/* FLAT FORM */}
        <form onSubmit={handleLogin} className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900
                           focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900
                           focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* FULL WIDTH BUTTON */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white rounded-xl text-lg font-semibold
                         hover:bg-teal-700 transition shadow-md active:scale-95"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* FOOTER LINKS */}
        <p className="text-center mt-8 text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-teal-600 font-semibold hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
