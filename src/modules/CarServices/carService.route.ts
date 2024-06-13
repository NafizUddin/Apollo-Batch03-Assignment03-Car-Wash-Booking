import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carServiceValidations } from './carService.validation';
import { carServiceControllers } from './carService.controllers';
import { slotAppointmentValidation } from '../Slots/slots.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(carServiceValidations.createCarServiceValidationSchema),
  carServiceControllers.createCarService,
);

router.post(
  '/slots',
  auth(USER_ROLE.admin),
  validateRequest(
    slotAppointmentValidation.createSlotAppointmentValidationSchema,
  ),
  carServiceControllers.createSlotAppointment,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  carServiceControllers.getSingleService,
);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(carServiceValidations.updateCarServiceValidationSchema),
  carServiceControllers.updateService,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  carServiceControllers.deleteService,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  carServiceControllers.getAllServices,
);

export const CarServiceRoutes = router;
