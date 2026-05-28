import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const stages = ["Applied", "Interview", "Offer", "Rejected"];

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    const newStatus = destination.droppableId;

    await axios.put(
      `http://localhost:5000/api/jobs/${draggableId}`,
      { status: newStatus },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchJobs();
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">🚀 Job Tracker Kanban</h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* BOARD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-4 gap-4">

          {stages.map((stage) => (
            <Droppable droppableId={stage} key={stage}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white/10 p-3 rounded-xl min-h-[500px]"
                >
                  <h2 className="text-center font-bold mb-3">{stage}</h2>

                  {jobs
                    .filter((job) => job.status === stage)
                    .map((job, index) => (
                      <Draggable
                        key={job._id}
                        draggableId={job._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white text-black p-3 mb-2 rounded shadow"
                          >
                            <h3 className="font-bold">{job.companyName}</h3>
                            <p className="text-sm">{job.jobTitle}</p>

                            <button
                              onClick={() => deleteJob(job._id)}
                              className="mt-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>
    </div>
  );
}