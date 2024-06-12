import { Model } from 'mongoose';

export type TLoginUser = {
  email: string;
  password: string;
};

export interface IUserSignUp {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  address: string;
}

export interface UserModel extends Model<IUserSignUp> {
  isUserExists(email: string): Promise<IUserSignUp | null>;
}
