import Joi from 'joi';

export const createMovieSchema = Joi.object({
  id: Joi.number().integer().min(3).max(16).required(),
  poster_path: Joi.string().min(3).required(),
  title: Joi.string().min(3).required(),
}).messages({
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'any.required': 'missing required {#label} field',
  'number.base': 'Field {#label} must be a number.',
});
