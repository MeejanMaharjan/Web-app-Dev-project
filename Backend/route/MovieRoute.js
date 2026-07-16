
import {Router}  from 'express';
import * as MovieController from '../controllers/MovieController.js';
import { movieValidationRules, validateMovie } from '../validators/MovieValidator.js';

const MovieRouter = Router();

MovieRouter.get('/', MovieController.getMovies);
MovieRouter.post('/', movieValidationRules, validateMovie, MovieController.addMovie);
MovieRouter.put('/:id', MovieController.updateMovie);
MovieRouter.delete('/:id', MovieController.deleteMovie);

export default MovieRouter;
