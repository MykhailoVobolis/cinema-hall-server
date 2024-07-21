import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

// Валідація ідентифікатора
export const isValidId = (req, res, next) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) {
    throw createHttpError(404, `${movieId} not valid id`);
  }

  next();
};
