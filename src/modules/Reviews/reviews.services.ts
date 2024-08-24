import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TReviews } from './reviews.interface';
import { Review } from './reviews.model';

const createReviewIntoDB = async (payload: TReviews) => {
  if (await Review.isReviewsExists(payload?.email)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Review already exists!');
  }

  const result = await Review.create(payload);
  return result;
};

const getAllReviewsFromDB = async () => {
  const result = await Review.find();

  if (result.length === 0) {
    return null;
  }

  return result;
};

export const ReviewsServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
};
