/* eslint-disable @typescript-eslint/no-explicit-any */
import SlotQueryBuilder from '../../queryBuilder/SlotQueryBuilder';
import { SlotAppointment } from './slots.model';

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const slotAppointmentQuery = new SlotQueryBuilder(
    SlotAppointment.find(),
    query,
  );

  // Apply the filtering logic
  slotAppointmentQuery.filter();
  slotAppointmentQuery.sort();
  slotAppointmentQuery.paginate();
  slotAppointmentQuery.populate('service');

  const meta = await slotAppointmentQuery.countTotal();
  const result = await slotAppointmentQuery.modelQuery.exec();

  if (result.length === 0) {
    return null;
  }
  return { meta, result };
};

export const SlotServices = {
  getAvailableSlotsFromDB,
};
