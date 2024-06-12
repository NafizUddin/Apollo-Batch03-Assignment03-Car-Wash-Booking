import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { IUserSignUp } from './auth.interface';
import { User } from './auth.model';

const signUpUserIntoDB = async (payload: IUserSignUp) => {
  if (await User.isUserExists(payload?.email)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already signed up! Login instead.',
    );
  }

  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  signUpUserIntoDB,
};
