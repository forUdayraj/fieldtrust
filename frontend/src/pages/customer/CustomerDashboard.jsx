export default function CustomerDashboard() {
  const userName = localStorage.getItem("name") || "Customer";


  return (
    <div className="px-6 py-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userName} 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your bookings and services easily.
        </p>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Create Booking */}
        <a
          href="/customer/create-booking"
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition block"
        >
          <h2 className="text-xl font-semibold text-blue-600">
            Create New Booking
          </h2>
          <p className="text-gray-600 mt-2">
            Book a home service quickly and easily.
          </p>
        </a>

        {/* View Bookings */}
        <a
          href="/customer/bookings"
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition block"
        >
          <h2 className="text-xl font-semibold text-blue-600">
            My Bookings
          </h2>
          <p className="text-gray-600 mt-2">
            View and track all your service bookings.
          </p>
        </a>

        {/* Upload Proof */}
        <a
          href="/customer/bookings"
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition block"
        >
          <h2 className="text-xl font-semibold text-blue-600">
            Upload Payment Proof
          </h2>
          <p className="text-gray-600 mt-2">
            Upload proof for completed services.
          </p>
        </a>

      </div>
    </div>
  );
}
