import axios from "axios";

const API_ROOT = process.env.REACT_APP_API || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_ROOT,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hrms_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  signup: (payload) => api.post("/auth/signup", payload).then((r) => r.data),
  login: (payload) => api.post("/auth/login", payload).then((r) => r.data),
  logout: () => api.post("/auth/logout").then((r) => r.data).catch(()=>{}),
  getProfile: () => api.get("/auth/me").then((r) => r.data),
  getEmployees: () => api.get("/employees").then((r) => r.data),
  createEmployee: (data) => api.post("/employees", data).then((r) => r.data),
  updateEmployee: (id, data) => api.put(`/employees/${id}`, data).then((r) => r.data),
  deleteEmployee: (id) => api.delete(`/employees/${id}`).then((r) => r.data),
  assignEmployee: (id, teamIds) => api.post(`/employees/${id}/assign`, { teamIds }).then((r) => r.data),
  getEmployeeTeams: (id) => api.get(`/employees/${id}/teams`).then((r) => r.data),
  getTeams: () => api.get("/teams").then((r) => r.data),
  createTeam: (data) => api.post("/teams", data).then((r) => r.data),
  updateTeam: (id, data) => api.put(`/teams/${id}`, data).then((r) => r.data),
  deleteTeam: (id) => api.delete(`/teams/${id}`).then((r) => r.data)
};
