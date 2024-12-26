import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';


const router = express.Router();


router.patch('/users/:userId/block', auth("admin"), AdminControllers.blockUser);
router.delete('/blogs/:id', auth("admin"), AdminControllers.deleteBlog)

export const adminRoutes = router;