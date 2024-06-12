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

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServicesOfCarService.getAllServicesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services retrieved successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ServicesOfCarService.getSingleServiceFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ServicesOfCarService.updateServiceIntoDB(req.body, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ServicesOfCarService.deleteServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
    data: result,
  });
});

const createSlotAppointment = catchAsync(async (req, res) => {
  const result = await ServicesOfCarService.createSlotAppointmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});

export const carServiceControllers = {
  createCarService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
  createSlotAppointment,
};
