import axios from 'axios';

const api = axios.create({
  baseURL: 'https://moviedashboardbackend01.vercel.app/movies',
});


export default api;