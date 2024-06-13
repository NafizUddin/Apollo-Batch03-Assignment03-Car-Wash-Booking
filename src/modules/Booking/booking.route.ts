import express from 'express';
import { BookingControllers } from './booking.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidations } from './booking.validation';
import { USER_ROLE } from '../Auth/auth.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(bookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

export const BookingRoutes = router;
