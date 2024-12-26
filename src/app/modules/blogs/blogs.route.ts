


import express from 'express';
import { blogControllers } from './blogs.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post('/', auth("user"), blogControllers.createBlog,);
router.patch('/:id', auth("user"), blogControllers.updateBlog);
router.get('/', blogControllers.getAllBlogs);
router.delete('/:id', auth("user"), blogControllers.deleteBlog);


export const blogRoutes = router;


