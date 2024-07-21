import createHttpError from 'http-errors';

import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
} from '../services/movies.js';

export const getMoviesController = async (req, res) => {
  const movies = await getAllMovies();

  res.status(200).json({
    status: 200,
    message: 'Successfully found movies!',
    data: movies,
  });
};

export const getMovieByIdController = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await getMovieById(movieId);

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
  const movie = await createMovie(req.body);

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
