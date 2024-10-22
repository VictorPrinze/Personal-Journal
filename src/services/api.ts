import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust this to match your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set token in Authorization header
export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Function to clear the Authorization header
export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

// Interceptor to handle unauthorized (401) errors
api.interceptors.response.use(
  response => response, // If response is successful, just return it
  error => {
    if (error.response && error.response.status === 401) {
      // Clear the token if the response is 401 Unauthorized
      localStorage.removeItem('token');
      setAuthToken('');
      window.location.href = '/login'; // Redirect to login on 401
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (email: string, password: string) =>
    api.post('/auth/register', { email, password }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

export const journalAPI = {
  createEntry: (title: string, content: string, category: string) =>
    api.post('/journals', { title, content, category }),
  getEntries: () => api.get('/journals'),
  updateEntry: (id: string, title: string, content: string, category: string) =>
    api.put(`/journals/${id}`, { title, content, category }),
  deleteEntry: (id: string) => api.delete(`/journals/${id}`),
};

export default api;