import { SlotAppointment } from './slots.model';

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  if (query?.date && query?.serviceId) {
    const result = await SlotAppointment.find({
      date: query?.date,
      service: query?.serviceId,
    }).populate('service');

    if (result.length === 0) {
      return null;
    }

    return result;
  } else if (query?.date) {
    const result = await SlotAppointment.find({
      date: query?.date,
    }).populate('service');

    if (result.length === 0) {
      return null;
    }
    return result;
  } else if (query?.serviceId) {
    const result = await SlotAppointment.find({
      service: query?.serviceId,
    }).populate('service');

    if (result.length === 0) {
      return null;
    }
    return result;
  }

  const result = await SlotAppointment.find().populate('service');

  if (result.length === 0) {
    return null;
  }

  return result;
};

export const SlotServices = {
  getAvailableSlotsFromDB,
};
