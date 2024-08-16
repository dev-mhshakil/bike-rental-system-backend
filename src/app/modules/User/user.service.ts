/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { userSearchableFields } from './user.constant';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';

const createUserInDB = async (userData: TUser) => {
  const { name, email, password, phone, address, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User already exists with this email',
    );
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
    role,
  });

  const newUser = User.findOne({ email }).select('-password').lean();

  return newUser;
};

const loginUser = async (payload: Partial<TLoginUser>) => {
  const { email, password } = payload;
  // checking if the user is exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the password is correct

  const isPasswordMatched = bcrypt.compare(password as string, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password!');
  }

  //Access Granted: Send AccessToken, RefreshToken
  // create token and send to the client
  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;

  return result;
};

const getUserByIdFromDB = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { role, userId, iat } = decoded;
  const user = await User.findById(userId);

  const userData = User.findOne({ email: user?.email })
    .select('-password')
    .lean();
  return userData;
};

const updateUser = async (token: string, payload: Partial<TUser>) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { role, userId, iat } = decoded;

  const result = await User.findByIdAndUpdate(userId, payload);

  const userData = User.findOne({ email: result?.email })
    .select('-password')
    .lean();

  return userData;
};

export const UserServices = {
  createUserInDB,
  loginUser,
  getAllUsersFromDB,
  getUserByIdFromDB,

  updateUser,
};
