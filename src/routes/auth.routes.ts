import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
import { me, updateProfile } from '../controllers/auth.me';

import {
  redirectToGithub,
  githubCallback,
} from '../controllers/auth.controller';

export const authRoutes = Router();

authRoutes.get('/github', redirectToGithub);
authRoutes.get('/github/callback', githubCallback);
authRoutes.get('/me', requireAuth, me);
authRoutes.post('/me', requireAuth, updateProfile);
authRoutes.put('/me', requireAuth, updateProfile);
