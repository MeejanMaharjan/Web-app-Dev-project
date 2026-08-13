
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://web-app-dev-project-server.onrender.com';

const MovieApi = axios.create({
  baseURL: `${API_BASE_URL}/movies`,
  withCredentials: true,
});

export const getMovies = () => {
  return MovieApi.get('/');
};

export const addMovie = (newMovie) => {
  return MovieApi.post('/', newMovie);
};

export const updateMovie = (id, updatedMovie) => {
  return MovieApi.put(`/${id}`, updatedMovie);
};

export const deleteMovie = (id) => {
  return MovieApi.delete(`/${id}`);
};

export const requestMovie = (requestData) => {
  return MovieApi.post('/requests', requestData);
};

export const getMovieRequests = () => {
  return MovieApi.get('/requests');
};

export const updateMovieRequestStatus = (id, status) => {
  return MovieApi.patch(`/requests/${id}`, { status });
};

export default MovieApi;
