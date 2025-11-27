import { useEffect, useState } from "react";
import { getCustomerBookings } from "../../api/booking";
import { Link } from "react-router-dom";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function load() {
      try {
        const res = await getCustomerBookings(user.id);
        setBookings(res.data || []);
      } catch (error) {
        console.error("Error loading bookings:", error);
      }
    }
    load();
  }, []);

  return (
    <div className="px-6 py-6 min-h-[calc(100vh-64px)] bg-gray-100">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Bookings
      </h1>

      {/* If no bookings */}
      {bookings.length === 0 && (
        <div className="text-center bg-white p-10 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No bookings found
          </h2>
          <p className="text-gray-500 mb-4">
            Book a service to get started.
          </p>

          <Link
            to="/customer/create-booking"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Booking
          </Link>
        </div>
      )}

      {/* Booking Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition duration-300"
          >
            {/* Header: Icon + Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">
                {b.serviceName.toLowerCase().includes("clean") && "🧹"}
                {b.serviceName.toLowerCase().includes("plumb") && "🔧"}
                {b.serviceName.toLowerCase().includes("electric") && "💡"}
                {b.serviceName.toLowerCase().includes("paint") && "🎨"}
                {b.serviceName.toLowerCase().includes("ac") && "❄️"}
                {!["clean", "plumb", "electric", "paint", "ac"].some(word =>
                  b.serviceName.toLowerCase().includes(word)
                ) && "🛠️"}
              </div>

              <h2 className="text-xl font-semibold text-blue-700">
                {b.serviceName}
              </h2>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              {b.serviceDescription}
            </p>

            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`
                  px-3 py-1 text-sm font-medium rounded-full 
                  ${
                    b.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : b.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : b.status === "proof_uploaded"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-700"
                  }
                `}
              >
                {b.status.replace("_", " ").toUpperCase()}
              </span>
            </div>

            {/* Footer: Buttons */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">

              <p className="text-gray-500 text-sm">
                <span className="font-medium">Booking ID:</span> {b.id}
              </p>

              {/* Upload Proof Button */}
              {b.status === "completed" && (
                <Link
                  to={`/customer/upload/${b.id}`}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Upload Proof →
                </Link>
              )}

              {/* Proof Uploaded Message */}
              {b.status === "proof_uploaded" && (
                <span className="text-green-600 font-semibold text-sm">
                  Proof Uploaded ✔
                </span>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
