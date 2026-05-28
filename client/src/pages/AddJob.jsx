import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AddJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    status: "applied",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", form);

      alert("Job added successfully ✅");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to add job ❌");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
        />
        <br /><br />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>

        <br /><br />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}