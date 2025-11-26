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
    alert("Booking Created!");
    navigate("/customer/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Booking</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="serviceName"
          placeholder="Service Name"
          onChange={handleChange}
        /><br/>

        <textarea
          name="serviceDescription"
          placeholder="Service Description"
          onChange={handleChange}
        ></textarea><br/>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
