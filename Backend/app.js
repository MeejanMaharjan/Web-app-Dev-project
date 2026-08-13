import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import MovieRouter from './route/MovieRoute.js';
import authRouter from './route/AuthRoutes.js';
import { DBConnection } from './config/db.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean)

app.use(cookieParser())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('The request is not allowed by CORS policy'))
    },

    credentials: true,
  }),
)
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, message: 'Server is running' });
});

app.use('/movies', MovieRouter);
app.use('/auth', authRouter);

await DBConnection();

app .listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
