


import express from 'express';
import { blogControllers } from './blogs.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blogs.validation';


const router = express.Router();

router.post('/', auth("user"), validateRequest(BlogValidation.createBlogValidationSchema), blogControllers.createBlog,);
router.patch('/:id', auth("user"),validateRequest(BlogValidation.updateBlogValidationSchema), blogControllers.updateBlog);
router.get('/', blogControllers.getAllBlogs);
router.delete('/:id', auth("user"), blogControllers.deleteBlog);


export const blogRoutes = router;


