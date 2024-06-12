import { Schema, model } from 'mongoose';
import { TSlotAppointment } from './slots.interface';
import { slotAppointmentStatus } from './slots.constants';

const slotSchema = new Schema<TSlotAppointment>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'CarService',
    },
    date: {
      type: String,
      required: [true, 'Slot appointment date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      match: [
        /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
        'Start time must be in HH:MM format',
      ],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      match: [
        /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
        'End time must be in HH:MM format',
      ],
    },
    isBooked: {
      type: String,
      enum: slotAppointmentStatus,
      default: 'available',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SlotAppointment = model<TSlotAppointment>('Slot', slotSchema);
