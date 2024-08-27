import { Types } from 'mongoose';

export type TBooking = {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  paymentStatus: string;
  transactionId?: string;
  totalBookingCost: number;
};
