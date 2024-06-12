import { Model } from 'mongoose';

export interface ICarService {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
}

export interface CarServiceModel extends Model<ICarService> {
  isServiceExists(name: string): Promise<ICarService | null>;
}
