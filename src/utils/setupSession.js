import { REFRESH_TOKEN_LIFETIME } from '../constants/index.js';

// Встановлення куків:

// Функція встановлює два сесіонні куки для відповіді які доступні тільки через HTTP-запити і не можуть бути доступними через JavaScript на стороні клієнта
export const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    sameSite: 'None', // Обов'язково для кросс-доменних запитів
    secure: process.env.NODE_ENV === 'production', // Встановлюємо true тільки в продакшн
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    sameSite: 'None', // Обов'язково для кросс-доменних запитів
    secure: process.env.NODE_ENV === 'production', // Встановлюємо true тільки в продакшн
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });
};
