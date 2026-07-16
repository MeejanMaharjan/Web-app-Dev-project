
import mongoose from "mongoose";
import Movie from "./data/Movies.js";
import { DBConnection } from "./config/db.js";
import SAMPLE_MOVIES from "./data/Movie.js";

await DBConnection();
await Movie.deleteMany({});
await Movie.insertMany(SAMPLE_MOVIES)
process.exit(0)
