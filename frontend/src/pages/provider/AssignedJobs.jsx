import { useEffect, useState } from "react";
import { getProviderJobs } from "../../api/provider";
import { Link } from "react-router-dom";

export default function AssignedJobs() {
  const providerId = localStorage.getItem("userId"); // ← FIX HERE
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function load() {
      if (!providerId) return;
      const res = await getProviderJobs(providerId);
      setJobs(res.data);
    }
    load();
  }, [providerId]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Assigned Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs assigned.</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <strong>{job.serviceName}</strong><br />
              Status: {job.status}<br />
              <Link to={`/provider/job/${job.id}`}>
                <button>View Details</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
