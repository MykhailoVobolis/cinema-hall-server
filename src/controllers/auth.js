import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  // Видалення паролю з відповіді на роуті POST /auth/register
  const data = {
    name: user.name,
    email: user.email,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};
