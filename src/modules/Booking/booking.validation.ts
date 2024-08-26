import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'Service Id is required',
    }),
    slotId: z.string({
      required_error: 'Slot Id is required',
    }),
  }),
});

export const bookingValidations = {
  createBookingValidationSchema,
};
