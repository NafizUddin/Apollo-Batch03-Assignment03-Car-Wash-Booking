import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { ICarService } from './carService.interface';
import { CarService } from './carService.model';

const createServiceIntoDB = async (payload: ICarService) => {
  if (await CarService.isServiceExists(payload?.name)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service already exists!');
  }

  const result = await CarService.create(payload);
  return result;
};

export const ServicesOfCarService = {
  createServiceIntoDB,
};
