import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../Auth/auth.model';
import { TBooking } from './booking.interface';
import { CarService } from '../CarServices/carService.model';
import { SlotAppointment } from '../Slots/slots.model';
import { Booking } from './booking.model';
import mongoose from 'mongoose';
import { initiatePayment } from '../../utils/payment';

const createBookingIntoDB = async (
  payload: Partial<TBooking>,
  userData: Record<string, unknown>,
) => {
  const transactionId = `TXN-${payload.service}`;

  const { email } = userData;

  const user = await User.isUserExists(email as string);
  const customerId = user?._id;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const service = await CarService.findById(payload?.service);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Car Service doesn't exist!");
  }

  const slot = await SlotAppointment.findById(payload?.slot);

  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot Appointment doesn't exist!");
  }

  const bookingData = { ...payload, customer: customerId, transactionId };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const [createdBooking] = await Booking.create([bookingData], { session });
    const result = await createdBooking.populate([
      { path: 'customer' },
      { path: 'service' },
      { path: 'slot' },
    ]);

    if (!Object.keys(result).length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to book service!');
    }

    await SlotAppointment.findByIdAndUpdate(
      slot?._id,
      { isBooked: 'booked' },
      { new: true, session },
    );

    const paymentData = {
      transactionId,
      amount: payload?.totalBookingCost,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      customerAddress: user.address,
    };

    const paymentSession = await initiatePayment(paymentData);

    await session.commitTransaction();
    await session.endSession();

    return paymentSession;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    // throw new AppError(httpStatus.BAD_REQUEST, 'Failed to book service!');
  }
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate([
    { path: 'customer' },
    { path: 'service' },
    { path: 'slot' },
  ]);

  if (result.length === 0) {
    return null;
  }

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
};
