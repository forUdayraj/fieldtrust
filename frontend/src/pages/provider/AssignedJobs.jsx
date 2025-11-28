import { useEffect, useState } from "react";
import { getProviderJobs } from "../../api/provider";
import { Link } from "react-router-dom";

export default function AssignedJobs() {
  const providerEmail = localStorage.getItem("userEmail"); // Store email instead of ID
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!providerEmail) {
        setError("No provider email found. Please log in again.");
        setLoading(false);
        return;
      }
      
      try {
        const res = await getProviderJobs(providerEmail); // Pass email instead of ID
        setJobs(res.data);
      } catch (err) {
        setError("Failed to load jobs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [providerEmail]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Assigned Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs assigned.</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job.id} style={{ marginBottom: 15 }}>
              <strong>{job.serviceName}</strong><br />
              Description: {job.serviceDescription}<br />
              Status: <span style={{ 
                color: job.status === 'completed' ? 'green' : 'orange',
                fontWeight: 'bold'
              }}>{job.status}</span><br />
              <Link to={`/provider/job/${job.id}`}>
                <button style={{ marginTop: 5 }}>View Details</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}