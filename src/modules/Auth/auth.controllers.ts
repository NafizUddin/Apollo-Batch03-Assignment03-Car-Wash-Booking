import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const signUpUsers = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { accessToken, user } = result;

  //   res.cookie('refreshToken', refreshToken, {
  //     secure: config.NODE_ENV === 'production',
  //     httpOnly: true,
  //   });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: user,
  });
});

export const AuthControllers = {
  signUpUsers,
  loginUser,
};
