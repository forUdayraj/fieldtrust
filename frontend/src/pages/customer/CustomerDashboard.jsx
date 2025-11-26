import { Link } from "react-router-dom";
import { logout } from "../../utils/logout";

export default function CustomerDashboard() {
  return (
    
    <div style={{ padding: 20 }}>
      <button onClick={logout} style={{ background: "red", color: "white" }}>
  Logout
</button>

      <h1>Customer Dashboard</h1>

      <Link to="/customer/create-booking">
        <button>Create Booking</button>
      </Link>

      <Link to="/customer/bookings">
        <button>My Bookings</button>
      </Link>
    </div>
  );
}
