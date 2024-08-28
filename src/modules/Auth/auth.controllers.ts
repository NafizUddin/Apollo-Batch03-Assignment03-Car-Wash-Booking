import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const signUpUsers = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpUserIntoDB(req.body);

  const { accessToken, response } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    token: accessToken,
    data: response,
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

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUsersFromDB(req.query);

  if (result === null) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AuthServices.updateUserIntoDB(req.body, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

export const AuthControllers = {
  signUpUsers,
  loginUser,
  getAllUsers,
  updateUser,
};
