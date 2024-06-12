import { Schema, model } from 'mongoose';
import { IUserSignUp } from './auth.interface';

const UserSignUpSchema = new Schema<IUserSignUp>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUserSignUp>('User', UserSignUpSchema);
