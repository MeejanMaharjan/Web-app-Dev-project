
import axios from 'axios';

const MovieApi = axios.create({
  baseURL: 'https://web-app-dev-project-server.onrender.com/movies'
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

export default MovieApi;
