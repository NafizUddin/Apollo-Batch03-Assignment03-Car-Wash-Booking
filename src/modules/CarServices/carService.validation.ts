import { z } from 'zod';

const createCarServiceValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Car service name is required',
      invalid_type_error: 'Service name must be a string',
    })
    .trim(),
  description: z
    .string({
      required_error: 'Car service description is required',
      invalid_type_error: 'Service description must be a string',
    })
    .trim(),
  price: z.number().min(0, 'Price cannot be negative'),
  duration: z
    .number()
    .int()
    .positive('Duration must be a positive integer (minutes)'),
  isDeleted: z.boolean().optional(),
});

export const carServiceValidations = {
  createCarServiceValidationSchema,
};
