/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { IUserSignUp, TLoginUser } from './auth.interface';
import { User } from './auth.model';
import { createToken } from './auth.utils';
import config from '../../config';
import UserQueryBuilder from '../../queryBuilder/UserQueryBuilder';
import { userSearchableFields } from './auth.constant';

const signUpUserIntoDB = async (payload: IUserSignUp) => {
  if (await User.isUserExists(payload?.email)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already signed up! Login instead.',
    );
  }

  const jwtPayload = {
    email: payload?.email,
    role: payload?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const response = await User.create(payload);

  const combinedResult = { accessToken, response };
  return combinedResult;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload?.email);

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Unregistered Email! Sign up instead.',
    );
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const combinedResult = { accessToken, user };
  return combinedResult;
};

const getAllUsersFromDB = async (query: any) => {
  const userQuery = new UserQueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  if (result.length === 0) {
    return null;
  }

  return { meta, result };
};

export const AuthServices = {
  signUpUserIntoDB,
  loginUser,
  getAllUsersFromDB,
};
