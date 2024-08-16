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

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User list fetched successfully',
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data fetched successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

const updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user: updatedUserData } = req.body;

  // data validation using zod

  const result = await UserServices.updateUser(id, updatedUserData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

// Login
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);

  const { refreshToken, accessToken } = result;

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
    },
  });
});

// Get Profile
// export const getProfile = async (req: Request, res: Response) => {
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'User not found');
//   }

//   res.status(httpStatus.OK).json({
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'User profile retrieved successfully',
//     data: user,
//   });
// };

// // Update Profile
// export const updateProfile = async (req: Request, res: Response) => {
//   const updates = req.body;

//   const user = await User.findByIdAndUpdate(req.user.id, updates, {
//     new: true,
//     runValidators: true,
//   });

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'User not found');
//   }

//   res.status(httpStatus.OK).json({
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Profile updated successfully',
//     data: user,
//   });
// };

export const UserController = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserById,
};
