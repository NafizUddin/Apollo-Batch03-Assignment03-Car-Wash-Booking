import express from 'express';
import { SlotControllers } from './slots.controllers';
import { USER_ROLE } from '../Auth/auth.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/availability',
  auth(USER_ROLE.admin, USER_ROLE.user),
  SlotControllers.getAvailableSlots,
);

export const SlotRoutes = router;
