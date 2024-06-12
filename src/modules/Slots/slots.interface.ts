import { Types } from 'mongoose';

export type TSlotAppointment = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
};
