import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../Auth/auth.model';
import { Booking } from '../Booking/booking.model';

const getIndividualUserBookingsFromDB = async (
  userData: Record<string, unknown>,
) => {
  const { email } = userData;

  const user = await User.isUserExists(email as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const result = await Booking.find({ customer: user?._id })
    .select('-customer')
    .populate([{ path: 'service' }, { path: 'slot' }]);

  return result;
};

export const individualUserBookingsServices = {
  getIndividualUserBookingsFromDB,
};
