import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bulir-backend.onrender.com/',
});

export default api;
