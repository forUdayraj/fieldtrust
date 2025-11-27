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

      // Decide if login is user or provider
      const user = res.data.user || res.data.provider;

      if (!user) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("token", token);

      // role: provider has no role in DB so we set manually
      console.log(user.role);
      const role = user.role || "PROVIDER";
      localStorage.setItem("role", role);

      localStorage.setItem("name", user.name);
      localStorage.setItem("user", JSON.stringify(user));

      // redirect
      if (role === "CUSTOMER") navigate("/customer/dashboard");
      if (role === "PROVIDER") navigate("/provider/dashboard");
      if (role === "ADMIN") navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-sm border border-gray-200">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Sign in to FieldTrust
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                         focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none
                         text-gray-800"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                         focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none
                         text-gray-800"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg
                       font-medium hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Signup */}
        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}
