import express from 'express';
import { USER_ROLE } from '../Auth/auth.constant';
import auth from '../../middlewares/auth';
import { BookingControllers } from '../Booking/booking.controllers';
import { individualUserBookingsControllers } from './individualUserBooking.controllers';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.user),
  individualUserBookingsControllers.getIndividualUserBookings,
);

export const IndividualBookingRoutes = router;
