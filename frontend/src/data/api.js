import axios from 'axios';

const api = axios.create
({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://online-event-management-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.error === 'Token expired. Please log in again.') {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
