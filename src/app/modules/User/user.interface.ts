import { ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserName = {
  firstName: string;
  middleName?: string | '';
  lastName: string;
};

export type TUser = {
  _id: ObjectId;
  name: TUserName;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;
