import { REFRESH_TOKEN_LIFETIME } from '../constants/index.js';

// Встановлення куків:

// Функція встановлює два сесіонні куки для відповіді які доступні тільки через HTTP-запити і не можуть бути доступними через JavaScript на стороні клієнта
// export const setupSession = (res, session) => {
//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     sameSite: 'None', // Обов'язково для кросс-доменних запитів
//     secure: process.env.NODE_ENV === 'production', // Встановлюємо true тільки в продакшн
//     expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
//   });
//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     sameSite: 'None', // Обов'язково для кросс-доменних запитів
//     secure: process.env.NODE_ENV === 'production', // Встановлюємо true тільки в продакшн
//     expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
//   });
// };

const isSafari = (userAgent) => {
  return /^((?!chrome|android).)*safari/i.test(userAgent);
};

export const setupSession = (req, res, session) => {
  try {
    const userAgent =
      req.headers['user-agent'] || req.headers['User-Agent'] || '';
    const isSafariBrowser = isSafari(userAgent);

    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      sameSite: isSafariBrowser ? 'Strict' : 'None', // Для Safari встановлюємо 'Strict'
      secure: process.env.NODE_ENV === 'production', // Встановлюємо true тільки в продакшн
      expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
    });
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      sameSite: isSafariBrowser ? 'Strict' : 'None', // Для Safari встановлюємо 'Strict'
      secure: process.env.NODE_ENV === 'production', // Встановлюємо true тільки в продакшн
      expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
    });

    res.status(200).send('Cookies set successfully');
  } catch (error) {
    console.error('Error setting cookies:', error);
    res.status(500).send('Internal Server Error');
  }
};
