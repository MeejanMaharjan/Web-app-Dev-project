
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://web-app-dev-project-server.onrender.com';

const TvShowApi = axios.create({
  baseURL: `${API_BASE_URL}/tvshows`,
  withCredentials: true,
});

export const getTvShows = () => {
  return TvShowApi.get('/');
};

export const addTvShow = (newShow) => {
  return TvShowApi.post('/', newShow);
};

export const updateTvShow = (id, updatedShow) => {
  return TvShowApi.put(`/${id}`, updatedShow);
};

export const deleteTvShow = (id) => {
  return TvShowApi.delete(`/${id}`);
};

export default TvShowApi;
