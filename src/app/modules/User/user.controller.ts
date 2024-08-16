import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.getUserByIdFromDB(token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateUserById = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const payload = req.body;

  // data validation using zod

  const result = await UserServices.updateUser(token as string, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

// Login
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);

  const { refreshToken, accessToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true if you're using HTTPS
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      accessToken,
      data: user,
    },
  });
});

export const UserController = {
  createUser,
  loginUser,
  getProfile,
  updateUserById,
};
