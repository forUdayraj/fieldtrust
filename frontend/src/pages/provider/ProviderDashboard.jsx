import { Link } from "react-router-dom";
import { logout } from "../../utils/logout";

export default function ProviderDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <button onClick={logout} style={{ background: "red", color: "white" }}>
  Logout
</button>

      <h1>Provider Dashboard</h1>

      <Link to="/provider/jobs">
        <button>View Assigned Jobs</button>
      </Link>
    </div>
  );
}
