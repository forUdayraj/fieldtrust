import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      if (!res.data) {
        alert("Invalid Login");
        return;
      }

      const user = res.data;

      // Save user info (later we will save JWT)
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "customer") navigate("/customer/dashboard");
      if (user.role === "provider") navigate("/provider/dashboard");
      if (user.role === "admin") navigate("/admin/dashboard");

    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} /><br/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br/>
        <button type="submit">Login</button>
      </form>

      <button onClick={() => navigate("/signup")}>Go To Signup</button>
    </div>
  );
}
