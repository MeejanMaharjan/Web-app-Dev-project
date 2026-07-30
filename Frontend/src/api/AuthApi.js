import axios from 'axios';

const AuthApi = axios.create({
  baseURL: 'https://web-app-dev-project-server.onrender.com/auth',
  withCredentials: true,
});

export const registerUser = (userData) => {
  return AuthApi.post('/register', userData);
};

export const loginUser = (credentials) => {
  return AuthApi.post('/login', credentials);
};

export default AuthApi;
