/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface ICarService {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  short_description: string;
  image: string;
}

export interface CarServiceModel extends Model<ICarService> {
  isServiceExists(name: string): Promise<ICarService | null>;
}
