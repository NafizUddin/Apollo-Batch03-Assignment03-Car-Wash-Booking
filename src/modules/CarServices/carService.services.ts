import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { ICarService } from './carService.interface';
import { CarService } from './carService.model';
import { TSlotAppointment } from '../Slots/slots.interface';
import { createIntervalsArray } from './carService.utils';
import { SlotAppointment } from '../Slots/slots.model';

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
  const service = await CarService.findById(payload.service);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Car Service doesn't exist!");
  }

  const startDate = new Date(`${payload.date} ${payload.startTime}`);
  const endDate = new Date(`${payload.date} ${payload.endTime}`);

  // Get the difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Convert the difference to minutes and round down to the nearest whole minute
  const totalSlotDuration = Math.floor(timeDifference / (1000 * 60));

  if (totalSlotDuration < service?.duration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Slot duration is insufficient!',
    );
  }

  const appointedSlotsArray = createIntervalsArray(payload, service);

  const result = await SlotAppointment.create(appointedSlotsArray);
  return result;
};

export const ServicesOfCarService = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
  createSlotAppointmentIntoDB,
};
