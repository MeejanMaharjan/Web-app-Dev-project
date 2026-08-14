
import { Router } from 'express';
import * as TvShowController from '../controllers/TvShowController.js';
import { movieValidationRules, validateMovie } from '../validators/MovieValidator.js';
import { authenticationMiddleware, requireAdmin } from '../middlewares/Auth.js';

const TvShowRouter = Router();

TvShowRouter.get('/', TvShowController.getTvShows);
TvShowRouter.post('/', authenticationMiddleware, requireAdmin, movieValidationRules, validateMovie, TvShowController.addTvShow);
TvShowRouter.put('/:id', authenticationMiddleware, requireAdmin, movieValidationRules, validateMovie, TvShowController.updateTvShow);
TvShowRouter.delete('/:id', authenticationMiddleware, requireAdmin, TvShowController.deleteTvShow);

export default TvShowRouter;
