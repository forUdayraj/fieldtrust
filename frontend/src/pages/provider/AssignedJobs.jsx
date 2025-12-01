// src/pages/provider/AssignedJobs.jsx

import { useEffect, useState } from "react";
import { getProviderJobs, updateJobStatus } from "../../api/provider";

export default function AssignedJobs() {
  const provider = JSON.parse(localStorage.getItem("user"));
  const providerId = provider?.id;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!providerId) {
        setError("Provider ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await getProviderJobs(providerId);
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch assigned jobs");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [providerId]);

  const markCompleted = async (id) => {
    await updateJobStatus(id, "completed");
    alert("Job marked as completed!");
    window.location.reload();
  };

  if (loading)
    return <p className="p-6 text-lg font-medium text-gray-700">Loading...</p>;

  if (error)
    return (
      <p className="p-6 text-red-600 font-semibold text-lg">
        {error}
      </p>
    );

  return (
    <div className="px-6 py-8 min-h-screen bg-gray-100">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Assigned Jobs
      </h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600 text-lg">No jobs assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 
                         hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              {/* Job Title */}
              <h2 className="text-xl font-bold text-blue-700 mb-2">
                {job.serviceName}
              </h2>

              {/* Job Description */}
              <p className="text-gray-700 mb-3">{job.serviceDescription}</p>

              {/* Created Date */}
              <p className="text-sm text-gray-500">
                Created At:{" "}
                {job.createdAt ? new Date(job.createdAt).toLocaleString() : "N/A"}
              </p>

              {/* Customer Info */}
              <p className="text-sm text-gray-600 mt-2">
                Customer ID: <span className="font-semibold">{job.customerId}</span>
              </p>

              {/* Status */}
              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    job.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {job.status.toUpperCase()}
                </span>
              </div>

              {/* Complete Button */}
              {job.status !== "completed" && (
                <button
                  onClick={() => markCompleted(job.id)}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg 
                             hover:bg-green-700 transition"
                >
                  Mark Completed ✔
                </button>
              )}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
