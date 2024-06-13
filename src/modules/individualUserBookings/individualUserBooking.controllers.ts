import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { individualUserBookingsServices } from './individualUserBooking.services';

const getIndividualUserBookings = catchAsync(async (req, res) => {
  const result =
    await individualUserBookingsServices.getIndividualUserBookingsFromDB(
      req.user,
    );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

export const individualUserBookingsControllers = {
  getIndividualUserBookings,
};
