
import mongoose from "mongoose";
import Movie from "./data/Movies.js";
import TvShow from "./data/TvShows.js";
import User from "./data/User.js";
import { DBConnection } from "./config/db.js";
import SAMPLE_MOVIES from "./data/Movie.js";
import SAMPLE_TV_SHOWS from "./data/TvShow.js";

const DEMO_USERS = [
  { name: "Demo Admin", email: "admin@momentdb.com", password: "Admin1234", isAdmin: true },
  { name: "Demo User", email: "user@momentdb.com", password: "User1234", isAdmin: false },
];

await DBConnection();
await Movie.deleteMany({});
await Movie.insertMany(SAMPLE_MOVIES)
await TvShow.deleteMany({});
await TvShow.insertMany(SAMPLE_TV_SHOWS)

await User.deleteMany({ email: { $in: DEMO_USERS.map((u) => u.email) } });
// insertMany skips the password-hashing pre-save hook, so create these one at a time.
for (const demoUser of DEMO_USERS) {
  await User.create(demoUser);
}

process.exit(0)
