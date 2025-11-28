import { Link } from "react-router-dom";
import { logout } from "../../utils/logout";

export default function ProviderDashboard() {
  const provider = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="px-6 py-8 min-h-[calc(100vh-64px)] bg-gray-100">
      
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {provider?.name || "Provider"} 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your assigned jobs and update job status.
            </p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Assigned Jobs */}
        <Link
          to={`/provider/job/${provider?.id}`}
          className="block bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">📋</span>
            <div>
              <h2 className="text-xl font-semibold text-blue-700">
                View Assigned Jobs
              </h2>
              <p className="text-gray-600 mt-1">
                Track all jobs assigned to you and update their status.
              </p>
            </div>
          </div>
        </Link>

        {/* Future Feature */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 opacity-60 cursor-not-allowed">
          <div className="flex items-center gap-4">
            <span className="text-4xl">⭐</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-400">
                Provider Insights (Coming Soon)
              </h2>
              <p className="text-gray-400 mt-1">
                View performance and job completion stats.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}