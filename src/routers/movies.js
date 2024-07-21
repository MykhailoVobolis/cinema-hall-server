import { Router } from 'express';

import {
  createMovieController,
  deleteMovieController,
  getMovieByIdController,
  getMoviesController,
} from '../controllers/movies.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/movies', ctrlWrapper(getMoviesController));

router.get('/movies/:movieId', ctrlWrapper(getMovieByIdController));

router.post('/movies', ctrlWrapper(createMovieController));

router.delete('/movies/:movieId', ctrlWrapper(deleteMovieController));

export default router;
