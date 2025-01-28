import express from 'express';
import routesUser from './src/routes/user.routes.js';
import routesBlogs from './src/routes/blogs.routes.js';
import { checkAuth } from './src/middlewares/checkAuth.js';
const router = express.Router();

router.use('/users', routesUser);
router.use('/blogs', checkAuth, routesBlogs);
export default router;
