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
    navigate("/customer/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-white via-teal-50 to-cyan-50 px-8 py-16">

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-16">

        {/* LEFT SIDE TEXT */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Book a service  
            <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              effortlessly.
            </span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Tell us what you need help with. Our platform will automatically 
            assign the most suitable professional for your task.
          </p>

          {/* Gradient Accent Bar */}
          <div className="h-1 w-32 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form 
          onSubmit={handleSubmit} 
          className="space-y-10"
        >
          {/* SERVICE NAME */}
          <div className="group">
            <label className="block text-gray-800 font-semibold mb-2 tracking-wide">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              value={form.serviceName}
              onChange={handleChange}
              placeholder="Cleaning, AC Repair, Plumbing..."
              className="w-full px-4 py-3 border-b border-gray-300 
                         bg-transparent text-gray-900 text-lg 
                         focus:border-teal-600 focus:outline-none 
                         transition-all duration-300"
              required
            />
            <div className="h-[2px] w-0 group-hover:w-full bg-teal-500 transition-all duration-300"></div>
          </div>

          {/* SERVICE DESCRIPTION */}
          <div className="group">
            <label className="block text-gray-800 font-semibold mb-2 tracking-wide">
              Service Description
            </label>
            <textarea
              name="serviceDescription"
              value={form.serviceDescription}
              onChange={handleChange}
              placeholder="Describe the issue or service required..."
              rows="5"
              className="w-full px-4 py-3 border-b border-gray-300 
                         bg-transparent text-gray-900 text-lg 
                         focus:border-teal-600 focus:outline-none 
                         transition-all duration-300 resize-none"
              required
            ></textarea>
            <div className="h-[2px] w-0 group-hover:w-full bg-teal-500 transition-all duration-300"></div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold rounded-xl 
                       bg-gradient-to-r from-teal-600 to-cyan-600 
                       text-white hover:opacity-90 active:scale-95 
                       transition-all shadow-md"
          >
            Confirm Booking
          </button>
        </form>

      </div>
      
    </div>
  );
}
