import axios from "axios";

const api = axios.create({
  baseURL: "https://jobhunt-api-production.up.railway.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export default api;
