import { Router } from 'express';
import { userRoutes } from '../modules/users/user.route';
import { authRoutes } from '../modules/auth/auth.route';



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
