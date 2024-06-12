import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carServiceValidations } from './carService.validation';
import { carServiceControllers } from './carService.controllers';

const router = express.Router();

router.post(
  '/',
  validateRequest(carServiceValidations.createCarServiceValidationSchema),
  carServiceControllers.createCarService,
);

export const CarServiceRoutes = router;
