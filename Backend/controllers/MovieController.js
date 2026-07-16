
import * as MovieModel from '../models/MovieModels.js';

export async function getMovies(req, res) {
    const movies = await MovieModel.getMovies();
    return res.status(200).json(movies);
}

export async function addMovie(req, res) {
    const newMovie = req.body;
    if (!newMovie.title || !newMovie.genre || !newMovie.year) {
        return res.status(400).json({ error: "Missing required movie information" });
    }
    const addedMovie = await MovieModel.addMovie(newMovie);
    return res.status(201).json({ message: "Movie added successfully", movie: addedMovie });
}


export async function updateMovie(req, res) {
    const movieID = req.params.id; // Keep it as a string for MongoDB IDs
    const updatedMovieData = req.body;

    try {
        const allMovies = await MovieModel.getMovies();
        
        const movie = allMovies.find(m => m.id === movieID || m._id?.toString() === movieID);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const updated = await MovieModel.updateMovie(movieID, updatedMovieData);
        return res.status(200).json({ message: "Movie updated successfully", movie: updated });
        
    } catch (error) {
        return res.status(500).json({ error: "Failed to update movie", details: error.message });
    }
}

export async function deleteMovie(req, res) {
    const movieID = req.params.id; 

    try {
        const allMovies = await MovieModel.getMovies();
        
        const movie = allMovies.find(m => m.id === movieID || m._id?.toString() === movieID);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        await MovieModel.deleteMovie(movieID);
        return res.status(200).json({ message: "Movie deleted successfully" }); 
        
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete movie", details: error.message });
    }
}