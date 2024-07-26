import {
  loginOrSignupWithGoogle,
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
} from '../services/auth.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { setupSession } from '../utils/setupSession.js';

// Контролер реєстрації користувача
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  // Login користувача при реєстрації
  const session = await loginUser(req.body);
  setupSession(res, session);

  // Видалення паролю з відповіді на роуті POST /auth/register
  const data = {
    name: user.name,
    email: user.email,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { data, accessToken: session.accessToken },
  });
};

// Контроллер login користувача
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  const user = {
    name: session.name,
    email: session.email,
    userId: session.userId,
  };

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { user, accessToken: session.accessToken },
  });
};

// Контроллер logout користувача
export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

// Контроллер refresh користувача
export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// Контролер створення посилання для аутентифікації користувача за допомогою його Google аккаунту
export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

// Контроллер Google аутентифікації
export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  const user = {
    name: session.name,
    email: session.email,
    userId: session.userId,
  };

  console.log(user);
  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: { user, accessToken: session.accessToken },
  });
};
