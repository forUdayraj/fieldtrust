import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (form.role === "PROVIDER") {
        await axios.post("/auth/register-provider", form);
      } else {
        await axios.post("/auth/register", form);
      }

      alert("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-teal-50 via-white to-cyan-50 px-6">

      <div className="w-full max-w-4xl">

        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Create your account
        </h1>
        <p className="text-gray-600 mb-10">
          Join FieldTrust and access trusted home services instantly.
        </p>

        {/* FORM */}
        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT SIDE COLUMNS */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 
                           focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 
                           focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>
          </div>

          {/* RIGHT SIDE COLUMNS */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 
                           focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 
                           focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              >
                <option value="">Select role</option>
                <option value="CUSTOMER">Customer</option>
                <option value="PROVIDER">Provider</option>
              </select>
            </div>
          </div>

          {/* FULL WIDTH BUTTON */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white rounded-xl text-lg font-semibold 
                         hover:bg-teal-700 transition shadow-md active:scale-95"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <p className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-teal-600 font-semibold hover:underline">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
}
