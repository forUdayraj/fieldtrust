import { useEffect, useState } from "react";
import { fetchAllBookings, verifyBooking, fetchAuditForBooking } from "../../api/admin";
import api from "../../api/axios";
import { logout } from "../../utils/logout";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [audit, setAudit] = useState([]);
  const [selected, setSelected] = useState(null);
  const [chainStatus, setChainStatus] = useState("");

  useEffect(() => {
    load();
    checkChain();  
  }, []);

  async function load() {
    const res = await fetchAllBookings();
    setBookings(res.data);
  }

  const viewAudit = async (bookingId) => {
    const res = await fetchAuditForBooking(bookingId);
    setAudit(res.data);
    setSelected(bookingId);
  };

  const checkChain = async () => {
    try {
      const res = await api.get("/audit/validate");
      setChainStatus(res.data);
    } catch (err) {
      setChainStatus("Error checking chain!");
    }
  };

  const handleVerify = async (bookingId, action) => {
    const admin = JSON.parse(localStorage.getItem("user"))?.email || "admin@local";
    await verifyBooking(bookingId, admin, action);
    alert("Action done: " + action);

    load();
    if (selected) viewAudit(selected);
  };

  return (
    <div style={{ padding: 20 }}>
      <button 
  onClick={logout}
  style={{
    padding: "8px 16px",
    marginBottom: "20px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  }}
>
  Logout
</button>

      <h1>Admin Dashboard</h1>

      {/* Chain Status Box */}
      <div style={{ 
        padding: "10px",
        marginBottom: "20px",
        color: chainStatus.startsWith("❌") ? "red" : "green",
        fontWeight: "bold",
        border: "1px solid",
        borderColor: chainStatus.startsWith("❌") ? "red" : "green"
      }}>
        {chainStatus}
      </div>

      <h2>All Bookings</h2>

      <ul>
        {bookings.map(b => (
          <li key={b.id} style={{ marginBottom: 10 }}>
            <strong>#{b.id} – {b.serviceName}</strong><br/>
            Status: {b.status}<br/>

            Proof: {b.proofUrl ? (
              <a href={`http://localhost:8080/files/${b.proofUrl}`} target="_blank" rel="noreferrer">
                View Proof
              </a>
            ) : "No proof"}<br/><br/>

            <button onClick={() => handleVerify(b.id, "approved")}>Approve</button>
            <button onClick={() => handleVerify(b.id, "rejected")} style={{ marginLeft: "10px" }}>
              Reject
            </button>
            <button onClick={() => viewAudit(b.id)} style={{ marginLeft: "10px" }}>
              View Audit
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div style={{ marginTop: 20 }}>
          <h3>Audit for booking #{selected}</h3>
          <ul>
            {audit.map(a => (
              <li key={a.id} style={{ marginBottom: "10px" }}>
                {a.timestamp} — {a.action} — by {a.performedBy}
                <br />
                <strong>IP:</strong> {a.ipAddress || "Not recorded"}
                <br />
                prevHash: {a.previousHash?.substring(0,12)}... — hash: {a.currentHash?.substring(0,12)}...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
