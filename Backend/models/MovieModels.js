
import Movie from "../data/Movies.js";
import MovieRequest from "../data/MovieRequest.js";

async function getMovies() {
    const movies = await Movie.find({});
    return movies;
}

async function addMovie(newMovie) {
    const movie = await Movie.create(newMovie);
    return movie;
}

async function updateMovie(id, updatedMovie) {
    const movie = await Movie.findByIdAndUpdate(id, updatedMovie, { new: true });
    return movie;
}

async function deleteMovie(id) {
    const movie = await Movie.findByIdAndDelete(id);
    return movie;
}

async function requestMovie(newRequest) {
    const request = await MovieRequest.create(newRequest);
    return request;
}

async function getMovieRequests() {
    const requests = await MovieRequest.find({}).sort({ createdAt: -1 });
    return requests;
}

async function updateMovieRequestStatus(id, status) {
    const request = await MovieRequest.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    return request;
}

export { getMovies, addMovie, updateMovie, deleteMovie, requestMovie, getMovieRequests, updateMovieRequestStatus };