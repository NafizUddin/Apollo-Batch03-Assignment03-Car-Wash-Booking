import { z } from 'zod';
import { vehicleTypes } from './booking.constant';

const createBookingValidationSchema = z.object({
  body: z.object({
    service: z
      .string({
        required_error: 'Service Id is required',
      })
      .cuid(),
    slot: z
      .string({
        required_error: 'Slot Id is required',
      })
      .cuid(),
    vehicleType: z.enum([...(vehicleTypes as [string, ...string[]])]),
    vehicleBrand: z.string({
      required_error: 'Vehicle Brand is required',
      invalid_type_error: 'Vehicle Brand must be a string',
    }),
    vehicleModel: z.string({
      required_error: 'Vehicle Model is required',
      invalid_type_error: 'Vehicle Model must be a string',
    }),
    manufacturingYear: z
      .number()
      .int()
      .min(1886, 'Manufacturing year must be greater than or equal to 1886')
      .positive(),
    registrationPlate: z.string({
      required_error: 'Registration Plate is required',
      invalid_type_error: 'Registration Plate must be a string',
    }),
  }),
});

export const bookingValidations = {
  createBookingValidationSchema,
};
