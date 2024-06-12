import { Schema, model } from 'mongoose';
import { IUserSignUp, UserModel } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const UserSignUpSchema = new Schema<IUserSignUp, UserModel>(
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
      select: 0,
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
    toJSON: {
      transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
      },
    },
  },
);

UserSignUpSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSignUpSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

UserSignUpSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUserSignUp, UserModel>('User', UserSignUpSchema);
