import { REFRESH_TOKEN_LIFETIME } from '../constants/index.js';

// Встановлення куків:

// Визначеня браузера клієнта
const isSafari = (userAgent) => {
  return /^((?!chrome|android).)*safari/i.test(userAgent);
};

// Функція встановлює два сесіонні куки для відповіді які доступні тільки через HTTP-запити і не можуть бути доступними через JavaScript на стороні клієнта
export const setupSession = (req, res, session) => {
  const userAgent = req.headers['user-agent'] || '';

  // Додаткова перевірка на існування заголовка
  if (!userAgent) {
    console.error('User-Agent header is missing');
  }

  const isSafariBrowser = isSafari(userAgent);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    // sameSite: 'None', // Обов'язково для кросс-доменних запитів
    sameSite: isSafariBrowser ? 'Strict' : 'None', // Для Safari встановлюємо 'Strict' для інших браузерів 'None'
    secure: process.env.NODE_ENV === 'production', // Встановлюємо true тільки в продакшн
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    // sameSite: 'None', // Обов'язково для кросс-доменних запитів
    sameSite: isSafariBrowser ? 'Strict' : 'None', // Для Safari встановлюємо 'Strict' для інших браузерів 'None'
    secure: process.env.NODE_ENV === 'production', // Встановлюємо true тільки в продакшн
    expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });
};
