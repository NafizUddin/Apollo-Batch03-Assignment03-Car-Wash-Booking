/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlotAppointment } from './slots.model';

interface QueryParams {
  date?: string; // Comma-separated string of dates
  serviceId?: string; // Service ID as a string
}

const getAvailableSlotsFromDB = async (query: QueryParams) => {
  const dateArray = query?.date ? query?.date.split(',') : null; // Split the date string into an array

  const queryConditions: Record<string, any> = {};

  if (dateArray && dateArray.length > 0) {
    queryConditions.date = { $in: dateArray }; // Use $in operator for matching multiple dates
  }

  if (query?.serviceId) {
    queryConditions.service = query?.serviceId;
  }

  const result =
    await SlotAppointment.find(queryConditions).populate('service');

  if (result.length === 0) {
    return null;
  }

  return result;
};

export const SlotServices = {
  getAvailableSlotsFromDB,
};
