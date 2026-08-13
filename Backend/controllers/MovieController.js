
import { isValidObjectId } from 'mongoose';
import * as MovieModel from '../models/MovieModels.js';

export async function getMovies(req, res) {
    try {
        const movies = await MovieModel.getMovies();
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch movies", details: error.message });
    }
}

export async function addMovie(req, res) {
    const newMovie = req.body;
    if (!newMovie.title || !newMovie.genre || !newMovie.year) {
        return res.status(400).json({ error: "Missing required movie information" });
    }
    try {
        const addedMovie = await MovieModel.addMovie(newMovie);
        return res.status(201).json({ message: "Movie added successfully", movie: addedMovie });
    } catch (error) {
        return res.status(500).json({ error: "Failed to add movie", details: error.message });
    }
}


export async function updateMovie(req, res) {
    const movieID = req.params.id; // Keep it as a string for MongoDB IDs
    const updatedMovieData = req.body;

    if (!isValidObjectId(movieID)) {
        return res.status(404).json({ error: "Movie not found" });
    }

    try {
        const updated = await MovieModel.updateMovie(movieID, updatedMovieData);

        if (!updated) {
            return res.status(404).json({ error: "Movie not found" });
        }

        return res.status(200).json({ message: "Movie updated successfully", movie: updated });

    } catch (error) {
        return res.status(500).json({ error: "Failed to update movie", details: error.message });
    }
}

export async function requestMovie(req, res) {
    const { title, year, genre, reason } = req.body;
    if (!title || !title.trim()) {
        return res.status(400).json({ error: "Movie title is required" });
    }
    try {
        const request = await MovieModel.requestMovie({ title, year, genre, reason });
        return res.status(201).json({ message: "Movie request submitted successfully", request });
    } catch (error) {
        return res.status(500).json({ error: "Failed to submit movie request", details: error.message });
    }
}

export async function getMovieRequests(req, res) {
    try {
        const requests = await MovieModel.getMovieRequests();
        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch movie requests", details: error.message });
    }
}

const REQUEST_STATUSES = ['pending', 'approved', 'rejected'];

export async function updateMovieRequest(req, res) {
    const requestID = req.params.id;
    const { status } = req.body;

    if (!REQUEST_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Status must be one of: ${REQUEST_STATUSES.join(', ')}` });
    }

    if (!isValidObjectId(requestID)) {
        return res.status(404).json({ error: "Movie request not found" });
    }

    try {
        const updated = await MovieModel.updateMovieRequestStatus(requestID, status);

        if (!updated) {
            return res.status(404).json({ error: "Movie request not found" });
        }

        return res.status(200).json({ message: "Movie request updated successfully", request: updated });

    } catch (error) {
        return res.status(500).json({ error: "Failed to update movie request", details: error.message });
    }
}

export async function deleteMovie(req, res) {
    const movieID = req.params.id;

    if (!isValidObjectId(movieID)) {
        return res.status(404).json({ error: "Movie not found" });
    }

    try {
        const deleted = await MovieModel.deleteMovie(movieID);

        if (!deleted) {
            return res.status(404).json({ error: "Movie not found" });
        }

        return res.status(200).json({ message: "Movie deleted successfully" });

    } catch (error) {
        return res.status(500).json({ error: "Failed to delete movie", details: error.message });
    }
}