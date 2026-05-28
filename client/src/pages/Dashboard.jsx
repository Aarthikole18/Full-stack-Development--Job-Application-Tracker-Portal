import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await API.get("/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    await API.delete(`/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Job Dashboard</h1>

      <button onClick={() => (window.location.href = "/add-job")}>
        + Add Job
      </button>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ border: "1px solid black", margin: 10, padding: 10 }}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.status}</p>

            <button onClick={() => deleteJob(job._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}