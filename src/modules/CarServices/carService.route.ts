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

router.get('/:id', carServiceControllers.getSingleService);

router.put(
  '/:id',
  validateRequest(carServiceValidations.updateCarServiceValidationSchema),
  carServiceControllers.updateService,
);

router.get('/', carServiceControllers.getAllServices);

export const CarServiceRoutes = router;
