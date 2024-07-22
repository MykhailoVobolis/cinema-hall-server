import { MoviesCollection } from '../db/models/movie.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllMovies = async ({ filter, page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const moviesQuery = MoviesCollection.find();

  if (filter.userId) {
    moviesQuery.where('userId').equals(filter.userId);
  }

  // Покращння швидкодії додатка за допомогою Promise.all():
  const [moviesCount, movies] = await Promise.all([
    MoviesCollection.find().merge(moviesQuery).countDocuments(),
    moviesQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(moviesCount, perPage, page);

  return {
    data: movies,
    ...paginationData,
  };
};

export const getMovieById = async (filter) => {
  const movie = await MoviesCollection.findOne(filter);
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
