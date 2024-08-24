import { model, Schema } from 'mongoose';
import { ReviewModel, IReviews } from './reviews.interface';

const reviewSchema = new Schema<IReviews, ReviewModel>(
  {
    feedback: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

reviewSchema.statics.isReviewsExists = async function (email: string) {
  return await Review.findOne({ email });
};

export const Review = model<IReviews, ReviewModel>('Review', reviewSchema);
