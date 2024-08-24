/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IReviews {
  feedback: string;
  rating: number;
  image: string;
  name: string;
  email: string;
}

export interface ReviewModel extends Model<IReviews> {
  isReviewsExists(email: string): Promise<IReviews | null>;
}
