export default function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "Customer";

  return (
    <div className="px-6 py-12">

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Welcome back, {userName}
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Manage your bookings and home services effortlessly.
        </p>
      </div>

      {/* ACTION GRID ― FLAT, MODERN, MINIMAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Create Booking */}
        <a
          href="/customer/create-booking"
          className="group p-8 border border-gray-200 rounded-2xl bg-white 
                     hover:bg-teal-50 hover:border-teal-300 transition-all"
        >
          <h2 className="text-2xl font-semibold text-teal-700 group-hover:text-teal-800 transition">
            Create Booking
          </h2>
          <p className="text-gray-600 mt-3">
            Book any home service instantly.
          </p>
        </a>

        {/* View Bookings */}
        <a
          href="/customer/bookings"
          className="group p-8 border border-gray-200 rounded-2xl bg-white 
                     hover:bg-teal-50 hover:border-teal-300 transition-all"
        >
          <h2 className="text-2xl font-semibold text-teal-700 group-hover:text-teal-800 transition">
            My Bookings
          </h2>
          <p className="text-gray-600 mt-3">
            Track all past and active bookings.
          </p>
        </a>

        {/* Upload Proof */}
        <a
          href="/customer/bookings"
          className="group p-8 border border-gray-200 rounded-2xl bg-white 
                     hover:bg-teal-50 hover:border-teal-300 transition-all"
        >
          <h2 className="text-2xl font-semibold text-teal-700 group-hover:text-teal-800 transition">
            Upload Proof
          </h2>
          <p className="text-gray-600 mt-3">
            Submit payment or job proof securely.
          </p>
        </a>

      </div>
    </div>
  );
}
