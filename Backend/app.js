import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import MovieRouter from './route/MovieRoute.js';
import { DBConnection } from './config/db.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/movies', MovieRouter);

await DBConnection();

app .listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
