import { MoviesCollection } from '../db/models/movie.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllMovies = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const moviesQuery = MoviesCollection.find();
  const moviesCount = await MoviesCollection.find()
    .merge(moviesQuery)
    .countDocuments();

  const movies = await moviesQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(moviesCount, perPage, page);

  return {
    data: movies,
    ...paginationData,
  };
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
