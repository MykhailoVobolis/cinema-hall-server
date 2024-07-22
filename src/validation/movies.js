import Joi from 'joi';

export const createMovieSchema = Joi.object({
  id: Joi.number().integer().required(),
  poster_path: Joi.string().required(),
  title: Joi.string().min(3).required(),
  userId: Joi.string(),
}).messages({
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'any.required': 'missing required {#label} field',
  'number.base': 'Field {#label} must be a number.',
});
