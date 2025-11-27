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
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-sm border border-gray-200">

        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Create your FieldTrust account
        </h1>

        <form onSubmit={handleSignup} className="space-y-6">

          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-lg text-gray-800"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg text-gray-800"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg text-gray-800"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              name="role"
              className="w-full px-4 py-2 border rounded-lg"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="CUSTOMER">Customer</option>
              <option value="PROVIDER">Provider</option>
            </select>
          </div>

          <button className="w-full py-2 bg-blue-600 text-white rounded-lg">
            Create Account
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-blue-600">Sign in</a>
        </p>

      </div>
    </div>
  );
}
