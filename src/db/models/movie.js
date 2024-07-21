import { model, Schema } from 'mongoose';

const moviesSchema = new Schema(
  {
    id: {
      type: Number, // потрібно додатково з'ясувати з яким типом надходе значення з бази TMBD
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MoviesCollection = model('movies', moviesSchema);
