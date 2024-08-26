import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'CarService',
      required: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: 'Slot', // database name
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
