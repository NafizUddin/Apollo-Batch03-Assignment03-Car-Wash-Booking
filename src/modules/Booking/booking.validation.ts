import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'Service Id is required',
    }),
    slotId: z.string({
      required_error: 'Slot Id is required',
    }),
    transactionId: z.string({
      required_error: 'transactionId is required',
    }),
    paymentStatus: z
      .string({
        required_error: 'Payment Status is required',
        invalid_type_error: 'Payment Status must be a string',
      })
      .trim(),
    totalBookingCost: z.number().nonnegative().min(1),
  }),
});

export const bookingValidations = {
  createBookingValidationSchema,
};
