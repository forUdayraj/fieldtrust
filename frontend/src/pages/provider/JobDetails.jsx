// src/pages/provider/JobDetails.jsx

import { useEffect, useState } from "react";
import { getBookingById } from "../../api/booking";
import { updateJobStatus } from "../../api/provider";
import { useParams } from "react-router-dom";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getBookingById(id);
      setJob(res.data);
    }
    load();
  }, [id]);

  const markCompleted = async () => {
    await updateJobStatus(id, "completed");
    alert("Job marked as completed!");
    window.location.reload();
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{job.serviceName}</h1>
      <p>{job.serviceDescription}</p>
      <p>Status: {job.status}</p>

      {job.status !== "completed" && (
        <button onClick={markCompleted}>Mark Completed</button>
      )}
    </div>
  );
}
