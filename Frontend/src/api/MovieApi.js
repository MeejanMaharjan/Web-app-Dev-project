
import axios from 'axios';

const MovieApi = axios.create({
  baseURL: 'http://localhost:3000/Movies'
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
