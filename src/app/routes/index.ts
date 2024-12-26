import { Router } from 'express';
import { userRoutes } from '../modules/users/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blogs/blogs.route';
import { adminRoutes } from '../modules/admin/admin.router';



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
