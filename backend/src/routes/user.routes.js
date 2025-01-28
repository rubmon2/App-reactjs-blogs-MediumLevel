import {
  createUser,
  loginUser,
  logoutUSer,
  profileUser,
} from '../controllers/user.controller.js';
import express from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/profile', checkAuth, profileUser);
router.post('/logout', logoutUSer);

export default router;
