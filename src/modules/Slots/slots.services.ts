import { TSlotAppointment } from './slots.interface';

const createSlotAppointmentIntoDB = async (payload: TSlotAppointment) => {
  console.log(payload);
};

export const SlotAppointmentServices = {
  createSlotAppointmentIntoDB,
};
