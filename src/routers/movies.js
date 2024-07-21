import { Router } from 'express';

import {
  createMovieController,
  deleteMovieController,
  getMovieByIdController,
  getMoviesController,
} from '../controllers/movies.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createMovieSchema } from '../validation/movies.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/movies', ctrlWrapper(getMoviesController));

router.get('/movies/:movieId', isValidId, ctrlWrapper(getMovieByIdController));

router.post(
  '/movies',
  validateBody(createMovieSchema),
  ctrlWrapper(createMovieController),
);

router.delete(
  '/movies/:movieId',
  isValidId,
  ctrlWrapper(deleteMovieController),
);

export default router;
