import axios from "axios";

const API_BASE_URL = "https://localhost:7218/api"; 

console.log("Using backend base URL:", API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  console.log("API Request:", config.method?.toUpperCase(), config.url);
  return config;
});

/* ---------------------------------------------------
   EMPLOYEE APIs
----------------------------------------------------*/

// GET /api/timesheet/user/{userId}
export const getUserTimesheets = (userId) =>
  api.get(`/timesheet/user/${userId}`);

// POST /api/timesheet
export const createTimesheet = (data) =>
  api.post("/timesheet", data);

// PUT /api/timesheet/submit/{id}
export const submitTimesheet = (id) =>
  api.put(`/timesheet/submit/${id}`);

/* ---------------------------------------------------
   MANAGER APIs
----------------------------------------------------*/

// GET /api/manager/submitted
export const getSubmittedTimesheets = () =>
  api.get("/manager/submitted");

// PUT /api/manager/approve/{id}
export const approveTimesheet = (id, comment) =>
  api.put(`/manager/approve/${id}`, {
    managerComments: comment,
  });

// PUT /api/manager/reject/{id}
export const rejectTimesheet = (id, comment) =>
  api.put(`/manager/reject/${id}`, {
    managerComments: comment,
  });
