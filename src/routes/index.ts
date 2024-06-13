import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CarServiceRoutes } from '../modules/CarServices/carService.route';
import { SlotRoutes } from '../modules/Slots/slots.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { IndividualBookingRoutes } from '../modules/individualUserBookings/individualUserBooking.route';

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
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/my-bookings',
    route: IndividualBookingRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
