import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.services';

const createBooking = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking successful',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
};
