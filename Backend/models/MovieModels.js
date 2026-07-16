
import Movie from "../data/Movies.js";

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

export { getMovies, addMovie, updateMovie, deleteMovie };