import { Link } from "react-router-dom";
import { logout } from "../../utils/logout";

export default function ProviderDashboard() {
  const provider = JSON.parse(localStorage.getItem("user")); // unified auth

  return (
    <div className="px-6 py-14 bg-gradient-to-b from-white via-teal-50 to-cyan-50 min-h-[calc(100vh-64px)]">

      {/* HEADER */}
      <div className="mb-14">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
          Welcome back, {provider?.name || "Provider"}
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Manage your jobs and track your work efficiently.
        </p>
      </div>

      {/* GRID ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">

        {/* ASSIGNED JOBS CARD */}
        <Link
          to="/provider/jobs"
          className="group p-10 border border-gray-200 rounded-2xl bg-white 
                     hover:border-teal-400 hover:bg-teal-50 transition-all duration-300"
        >
          <div className="mb-4 h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>

          <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-teal-700 transition">
            Assigned Jobs
          </h2>

          <p className="text-gray-600 mt-3 leading-relaxed">
            View and track all tasks assigned to you in real time.
          </p>
        </Link>

        {/* INSIGHTS (COMING SOON) */}
        <div className="p-10 border border-gray-200 rounded-2xl bg-gray-50 opacity-70 cursor-not-allowed">
          <div className="mb-4 h-1 w-20 bg-gray-300 rounded-full"></div>

          <h2 className="text-2xl font-semibold text-gray-400">
            Provider Insights (Coming Soon)
          </h2>

          <p className="text-gray-400 mt-3 leading-relaxed">
            Analytics, performance score, job trends — launching soon.
          </p>
        </div>

      </div>

    </div>
  );
}
