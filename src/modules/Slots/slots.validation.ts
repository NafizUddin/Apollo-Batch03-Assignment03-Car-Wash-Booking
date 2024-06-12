import { z } from 'zod';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const createSlotAppointmentValidationSchema = z
  .object({
    service: z.string({
      required_error: 'Service name is required',
    }),
    date: z
      .string({
        required_error: 'Appointment date is required',
      })
      .transform((str) => {
        try {
          new Date(str); // Validate date format during transformation
          return str;
        } catch (error) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            'Invalid date format (YYYY-MM-DD)',
          );
        }
      }),
    startTime: z
      .string({
        required_error: 'Start time is required',
      })
      .regex(
        /^[0-1][0-9]|2[0-3]:[0-5][0-9]$/,
        'Start time must be in HH:MM format',
      ),
    endTime: z
      .string({
        required_error: 'End time is required',
      })
      .regex(
        /^[0-1][0-9]|2[0-3]:[0-5][0-9]$/,
        'End time must be in HH:MM format',
      ),
  })
  .refine((data) => new Date(data.date) >= new Date(), {
    message: 'Appointment date cannot be in the past',
    path: ['date'],
  })
  .refine((data) => new Date(data.startTime) < new Date(data.endTime), {
    message: 'Start time must be before end time',
    path: ['startTime', 'endTime'],
  });

export const slotAppointmentValidation = {
  createSlotAppointmentValidationSchema,
};
