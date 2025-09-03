import axios from 'axios';

const api = axios.create({
  baseURL: 'https://moviedashboardbackend.vercel.app/movies', // backend route
});

export default api;
