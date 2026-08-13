import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://web-app-dev-project-server.onrender.com';

const AuthApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  withCredentials: true,
});

export const registerUser = (userData) => {
  return AuthApi.post('/register', userData);
};

export const loginUser = (credentials) => {
  return AuthApi.post('/login', credentials);
};

export const logoutUser = () => {
  return AuthApi.post('/logout');
};

export const getCurrentUser = () => {
  return AuthApi.get('/me');
};

export default AuthApi;
