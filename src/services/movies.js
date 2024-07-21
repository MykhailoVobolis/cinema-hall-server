import { MoviesCollection } from '../db/models/movie.js';

export const getAllMovies = async () => {
  const movies = await MoviesCollection.find();
  return movies;
};

export const getMovieById = async (movieId) => {
  const movie = await MoviesCollection.findById(movieId);
  return movie;
};

export const createMovie = async (payload) => {
  const movie = await MoviesCollection.create(payload);
  return movie;
};

export const deleteMovie = async (movieId) => {
  const movie = await MoviesCollection.findOneAndDelete({
    _id: movieId,
  });

  return movie;
};
