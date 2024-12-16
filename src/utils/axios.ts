import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

// const api = axios.create({
//   baseURL: "https://jobhunt-api-production.up.railway.app/api/v1",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 60000,
// });


export default api;
