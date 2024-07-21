import bcrypt from 'bcrypt';

import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const registerUser = async (payload) => {
  // Перевірка email на унікальність під час реєстрації
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  // Хешування паролю
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
