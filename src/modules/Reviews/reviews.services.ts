import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { IReviews } from './reviews.interface';
import { Review } from './reviews.model';

const createReviewIntoDB = async (payload: IReviews) => {
  if (await Review.isReviewsExists(payload?.email)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Review already exists!');
  }

  const result = await Review.create(payload);
  return result;
};

const getAllReviewsFromDB = async () => {
  const result = await Review.find().sort('-createdAt');

  if (result.length === 0) {
    return null;
  }

  const totalRatingCount = result.length;

  const sumOfRating = result.reduce((total, item) => total + item.rating, 0);

  const avgRating = Number((sumOfRating / totalRatingCount).toFixed(2));

  return { result, avgRating };
};

export const ReviewsServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
};
