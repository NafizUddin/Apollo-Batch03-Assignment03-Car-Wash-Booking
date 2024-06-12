import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServicesOfCarService } from './carService.services';

const createCarService = catchAsync(async (req, res) => {
  const result = await ServicesOfCarService.createServiceIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});

export const carServiceControllers = {
  createCarService,
};
