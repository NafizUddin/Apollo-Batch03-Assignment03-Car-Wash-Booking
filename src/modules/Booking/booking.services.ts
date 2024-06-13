import { TBooking } from './booking.interface';

const createBookingIntoDB = async (payload: TBooking) => {
  console.log(payload);
};

export const BookingServices = {
  createBookingIntoDB,
};
