import createHttpError from 'http-errors';

import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
} from '../services/movies.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getMoviesController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = { userId };

  const movies = await getAllMovies({
    page,
    perPage,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found movies!',
    data: movies,
  });
};

export const getMovieByIdController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { movieId } = req.params;
  const movie = await getMovieById({ _id: movieId, userId });

  // Відповідь, якщо фільм не знайдено
  if (!movie) {
    throw createHttpError(404, 'Movie not found');
  }

  // Відповідь, якщо фільм знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found movie with id ${movieId}!`,
    data: movie,
  });
};

export const createMovieController = async (req, res) => {
  const { _id: userId } = req.user;
  const movie = await createMovie({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: `Successfully created a movie!`,
    data: movie,
  });
};

export const deleteMovieController = async (req, res) => {
  const { movieId } = req.params;

  const movie = await deleteMovie(movieId);

  // Відповідь, якщо фільм не знайдено
  if (!movie) {
    throw createHttpError(404, 'Movie not found');
  }
  // Відповідь, якщо фільм знайдено і успішно видалено
  res.status(204).send();
};
