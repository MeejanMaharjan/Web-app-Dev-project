
import {Router}  from 'express';
import * as MovieController from '../controllers/MovieController.js';
import { movieValidationRules, validateMovie } from '../validators/MovieValidator.js';
import { authenticationMiddleware, requireAdmin } from '../middlewares/Auth.js';

const MovieRouter = Router();

MovieRouter.get('/', MovieController.getMovies);
MovieRouter.get('/requests', authenticationMiddleware, requireAdmin, MovieController.getMovieRequests);
MovieRouter.post('/requests', MovieController.requestMovie);
MovieRouter.patch('/requests/:id', authenticationMiddleware, requireAdmin, MovieController.updateMovieRequest);
MovieRouter.post('/', authenticationMiddleware, requireAdmin, movieValidationRules, validateMovie, MovieController.addMovie);
MovieRouter.put('/:id', authenticationMiddleware, requireAdmin, movieValidationRules, validateMovie, MovieController.updateMovie);
MovieRouter.delete('/:id', authenticationMiddleware, requireAdmin, MovieController.deleteMovie);

export default MovieRouter;
