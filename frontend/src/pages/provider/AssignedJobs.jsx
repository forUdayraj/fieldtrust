import { useEffect, useState } from "react";
import { getProviderJobs } from "../../api/provider";
import { Link } from "react-router-dom";

export default function AssignedJobs() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getProviderJobs(user.id);
      setJobs(res.data);
    }
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Assigned Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs assigned.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
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
