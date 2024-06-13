import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import { vehicleTypes } from './booking.constant';

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
      ref: 'SlotAppointment',
      required: true,
    },
    vehicleType: {
      type: String,
      enum: {
        values: vehicleTypes,
        message: '{VALUE} is not a valid vehicle type',
      },
      required: [true, 'Vehicle type is required'],
    },
    vehicleBrand: {
      type: String,
      required: [true, 'Vehicle brand is required'],
    },
    vehicleModel: {
      type: String,
      required: [true, 'Vehicle model is required'],
    },
    manufacturingYear: {
      type: Number,
      required: [true, 'Manufacturing year is required'],
      min: [1886, 'Manufacturing year must be greater than or equal to 1886'], // Considering the first car was made in 1886
    },
    registrationPlate: {
      type: String,
      unique: true,
      required: [true, 'Registration plate is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
