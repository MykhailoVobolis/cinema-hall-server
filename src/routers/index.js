import { Router } from 'express';
import moviesRouter from './movies.js';
import authRouter from './auth.js';

const router = Router();

router.use('/movies', moviesRouter);
router.use('/auth', authRouter);

export default router;
