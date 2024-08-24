import express from 'express';
import { SlotControllers } from './slots.controllers';

const router = express.Router();

router.get('/availability', SlotControllers.getAvailableSlots);

export const SlotRoutes = router;
