import axios from "axios";

/*
  🔥 IMPORTANT:
  Use ONLY ONE of these depending on your setup
*/

// ✅ OPTION 1 (LOCAL DEVELOPMENT)
const BASE_URL = "http://localhost:5000/api";

/*
// ✅ OPTION 2 (PRODUCTION - Render)
const BASE_URL = "https://full-stack-development-job-application.onrender.com/api";
*/

const API = axios.create({
  baseURL: BASE_URL,
});

// Optional: attach token if you use auth later
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;