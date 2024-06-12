import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CarServiceRoutes } from '../modules/CarServices/carService.route';

const router = Router();

const moduleRouter = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: CarServiceRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
