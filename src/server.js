import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routers/index.js';

import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  // Налаштування CORS для дозволу передачи cookies між доменами
  // (Щоб вирішити проблему з CORS, необхідно переконатися, що заголовок Access-Control-Allow-Origin не встановлено значення *, коли використовуються облікові дані (cookies). Натомість вкажіть точне джерело (origin).)
  const corsOptions = {
    origin: ['http://localhost:5173', 'https://top-cinema-hall.vercel.app'], // Вказуємо всі дозволені URL фронтенду
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Для передачі cookies та авторизаційних заголовків
  };

  app.use(cors(corsOptions));

  app.use(cookieParser());

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
