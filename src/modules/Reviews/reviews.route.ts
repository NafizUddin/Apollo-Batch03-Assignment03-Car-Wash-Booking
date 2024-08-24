import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewsValidations } from './reviews.validation';
import { ReviewControllers } from './reviews.controller';
const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewsValidations.createReviewValidationSchema),
  ReviewControllers.createReviews,
);

router.get('/', ReviewControllers.getAllReviews);

export const ReviewRoutes = router;
