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

router.get('/', ctrlWrapper(getMoviesController));

router.get('/:movieId', isValidId, ctrlWrapper(getMovieByIdController));

router.post(
  '',
  validateBody(createMovieSchema),
  ctrlWrapper(createMovieController),
);

router.delete('/:movieId', isValidId, ctrlWrapper(deleteMovieController));

export default router;
