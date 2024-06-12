import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotAppointmentServices } from './slots.services';

const createSlotAppointment = catchAsync(async (req, res) => {
  const result = await SlotAppointmentServices.createSlotAppointmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});
