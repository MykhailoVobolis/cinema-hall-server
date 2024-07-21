import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './ hooks.js';

const moviesSchema = new Schema(
  {
    id: {
      type: Number,
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

// Використання Mongoose хук mongooseSaveError при додаванні("save") об'єкта що не відповідає схемі валідації
moviesSchema.post('save', mongooseSaveError);

// Використання Mongoose хук setUpdateSettings перед ("pre") оновленням об'екта
moviesSchema.pre('findOneAndUpdate', setUpdateSettings);

// Використання Mongoose хук mongooseSaveError при оновленні "findOneAndUpdate" об'єкта що не відповідає схемі валідації
moviesSchema.post('findOneAndUpdate', mongooseSaveError);

export const MoviesCollection = model('movies', moviesSchema);
