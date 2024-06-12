import { SlotAppointment } from './slots.model';

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  if (query?.date && query?.serviceId) {
    const result = await SlotAppointment.find({
      date: query?.date,
      service: query?.serviceId,
    }).populate('service');
    return result;
  } else if (query?.date) {
    const result = await SlotAppointment.find({
      date: query?.date,
    }).populate('service');
    return result;
  } else if (query?.serviceId) {
    const result = await SlotAppointment.find({
      service: query?.serviceId,
    }).populate('service');
    return result;
  }

  const result = await SlotAppointment.find().populate('service');
  return result;
};

export const SlotServices = {
  getAvailableSlotsFromDB,
};
