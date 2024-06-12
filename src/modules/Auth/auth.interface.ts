import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

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
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
