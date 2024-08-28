import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import { AuthControllers } from './auth.controllers';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(authValidations.signUpValidationSchema),
  AuthControllers.signUpUsers,
);

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.get('/users', AuthControllers.getAllUsers);

router.patch(
  '/users/:id',
  validateRequest(authValidations.updateUserStatusValidationSchema),
  AuthControllers.updateUser,
);

export const AuthRoutes = router;
