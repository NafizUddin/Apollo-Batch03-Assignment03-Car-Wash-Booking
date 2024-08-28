import express from 'express';
import { SlotControllers } from './slots.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { slotAppointmentValidation } from './slots.validation';

const router = express.Router();

router.get('/availability', SlotControllers.getAvailableSlots);

router.patch(
  '/:id',
  validateRequest(
    slotAppointmentValidation.updateSlotAppointmentValidationSchema,
  ),
  SlotControllers.updateSlot,
);

export const SlotRoutes = router;
