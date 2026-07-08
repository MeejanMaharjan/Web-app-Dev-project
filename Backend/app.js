import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import SAMPLE_MOVIES from "./data/Movie.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/Movies", (req, res) => {
    return res.json(SAMPLE_MOVIES);
});

app.post("/Movies", (req, res) => {
    const newMovie = req.body
    if(!newMovie.title || !newMovie.genre || !newMovie.year) {
        return res.status(400).json({ error: "Missing required movie information" });
    }
    SAMPLE_MOVIES.push(newMovie);
    return res.status(201).json({ message: "Movie added successfully", movie: newMovie });
});

app.put("/Movies/:id", (req, res) => {
    const newMovie = req. body

    const MovieId = parseInt(req.params.id)

    const Movie = SAMPLE_MOVIES.find(movie => movie.id === MovieId)

    if(!Movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    object.assign(Movie, newMovie);
    return res.status(200).json({ message: "Movie updated successfully", movie: Movie });
});

app.delete("/Movies/:id", (req, res) => {
    const MovieId = parseInt(req.params.id)

    const MovieIndex = SAMPLE_MOVIES.findIndex(movie => movie.id === MovieId)

    if(MovieIndex === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }

    SAMPLE_MOVIES.splice(MovieIndex, 1);
    return res.status(204).json({ message: "Movie deleted successfully" });
});

dotenv.config();
const PORT = process.env.PORT || 3001;

app .listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
