/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TReviews = {
  feedback: string;
  rating: number;
  image: string;
  name: string;
  email: string;
};

export interface ReviewModel extends Model<TReviews> {
  isReviewsExists(email: string): Promise<TReviews | null>;
}
