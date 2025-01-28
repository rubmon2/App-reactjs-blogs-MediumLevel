import {
  createBlogs,
  deleteBlog,
  getAllBlogs,
  getOneBlogs,
  udpateBlogs,
} from '../controllers/blogs.controller.js';
import express from 'express';

const router = express.Router();

router.post('/register', createBlogs);
router.put('/update/:blogId', udpateBlogs);
router.delete('/delete/:blogId', deleteBlog);
router.get('/', getAllBlogs);
router.get('/:blogId', getOneBlogs);

export default router;
