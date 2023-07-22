import axios from "axios";

const BASE_URL = "http://localhost:4000";

const apiService = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 5 seconds timeout for API requests
});

export default apiService;