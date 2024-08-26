import { z } from 'zod';

const createCarServiceValidationSchema = z.object({
  body: z.object({
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
    short_description: z
      .string({
        required_error: 'Car service short description is required',
        invalid_type_error: 'Service short description must be a string',
      })
      .trim(),
    price: z.number().min(0, 'Price cannot be negative'),
    duration: z
      .number()
      .int()
      .max(120, 'Time duration must be less than 120')
      .positive('Duration must be a positive integer (minutes)'),
    isDeleted: z.boolean().optional(),
    image: z.string({
      required_error: 'Car service photo is required',
    }),
  }),
});

const updateCarServiceValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Car service name is required',
        invalid_type_error: 'Service name must be a string',
      })
      .trim()
      .optional(),
    description: z
      .string({
        required_error: 'Car service description is required',
        invalid_type_error: 'Service description must be a string',
      })
      .trim()
      .optional(),
    short_description: z
      .string({
        required_error: 'Car service short description is required',
        invalid_type_error: 'Service short description must be a string',
      })
      .trim()
      .optional(),
    price: z.number().min(0, 'Price cannot be negative').optional(),
    duration: z
      .number()
      .int()
      .positive('Duration must be a positive integer (minutes)')
      .max(120, 'Time duration must be less than 120')
      .optional(),
    isDeleted: z.boolean().optional(),
    image: z
      .string({
        required_error: 'Car service photo is required',
      })
      .optional(),
  }),
});

export const carServiceValidations = {
  createCarServiceValidationSchema,
  updateCarServiceValidationSchema,
};
