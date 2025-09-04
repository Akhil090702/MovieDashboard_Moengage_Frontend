import axios from 'axios';

const api = axios.create({
  baseURL: 'https://moviedashboard-moengage-backend.onrender.com/movies',
});


export default api;