import { useEffect, useState } from "react";
import { getCustomerBookings } from "../../api/booking";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function load() {
      const res = await getCustomerBookings(user.id);
      setBookings(res.data);
    }
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id} style={{ marginBottom: "20px" }}>
              <strong>{b.serviceName}</strong><br />
              Status: {b.status}<br />
              <small>{b.serviceDescription}</small><br />

              {/* Show Upload Button ONLY when provider has marked as completed */}
              {b.status === "completed" && (
                <button
                  onClick={() =>
                    window.location.href = `/customer/upload/${b.id}`
                  }
                >
                  Upload Proof
                </button>
              )}

              {/* If already uploaded */}
              {b.status === "proof_uploaded" && (
                <p>Proof Uploaded ✔</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
