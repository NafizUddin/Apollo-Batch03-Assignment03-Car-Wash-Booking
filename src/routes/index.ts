import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CarServiceRoutes } from '../modules/CarServices/carService.route';
import { SlotRoutes } from '../modules/Slots/slots.route';

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
  {
    path: '/slots',
    route: SlotRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
