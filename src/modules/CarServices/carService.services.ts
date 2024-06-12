import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { ICarService } from './carService.interface';
import { CarService } from './carService.model';
import { TSlotAppointment } from '../Slots/slots.interface';

const createServiceIntoDB = async (payload: ICarService) => {
  if (await CarService.isServiceExists(payload?.name)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service already exists!');
  }

  const result = await CarService.create(payload);
  return result;
};

const getAllServicesFromDB = async () => {
  const result = await CarService.find();
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const singleService = await CarService.findById(id);

  if (singleService?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found!');
  } else {
    return singleService;
  }
};

const updateServiceIntoDB = async (
  payload: Partial<ICarService>,
  id: string,
) => {
  const result = await CarService.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await CarService.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

const createSlotAppointmentIntoDB = async (payload: TSlotAppointment) => {
  console.log(payload);

  

  const start = new Date(`1970-01-01T${payload.startTime}:00Z`);
  const end = new Date(`1970-01-01T${payload.endTime}:00Z`);
};

export const ServicesOfCarService = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
  createSlotAppointmentIntoDB,
};
