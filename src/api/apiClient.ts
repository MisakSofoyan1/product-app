import axios from 'axios';
const BASE_URL = "http://localhost:3001";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
