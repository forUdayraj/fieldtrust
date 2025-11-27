import { useState } from "react";
import { createBooking } from "../../api/booking";
import { useNavigate } from "react-router-dom";

export default function CreateBooking() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    customerId: user.id,
    serviceName: "",
    serviceDescription: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBooking(form);
    alert("Booking Created Successfully!");
    navigate("/customer/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md border border-gray-200">

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Booking
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Service Name */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              placeholder="Enter service name"
              value={form.serviceName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Service Description */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Service Description
            </label>
            <textarea
              name="serviceDescription"
              placeholder="Enter service details"
              value={form.serviceDescription}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Booking
          </button>

        </form>
      </div>
    </div>
  );
}
