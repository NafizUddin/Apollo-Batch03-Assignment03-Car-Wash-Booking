import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'User name is required',
        invalid_type_error: 'User name must be a string',
      })
      .trim(),
    feedback: z
      .string({
        required_error: 'User Feedback is required',
        invalid_type_error: 'User Feedback must be a string',
      })
      .trim(),
    rating: z.number().min(1, 'Rating cannot be 0').max(5),
    image: z.string({
      required_error: 'User Avatar is required',
    }),
  }),
});

export const ReviewsValidations = {
  createReviewValidationSchema,
};
