import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { TUser, TUserName } from './user.interface';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
      maxLength: [20, 'First Name can not exceed 20 characters'],
    },
    middleName: {
      type: String,
      trim: true,
      maxLength: [20, 'Middle Name can not exceed 20 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      trim: true,
      maxLength: [20, 'Last Name can not exceed 20 characters'],
    },
  },
  { _id: false },
);

const userSchema = new Schema<TUser>(
  {
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      match: /^\+?[0-9]{1,15}$/,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not a valid role.',
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
userSchema.virtual('fullName').get(function () {
  const middleName = this?.name?.middleName ? ` ${this?.name?.middleName}` : '';
  return `${this?.name?.firstName}${middleName} ${this?.name?.lastName}`;
});

// query middleware/ hook

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

userSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // hash the password before saving it to the database
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<TUser>('User', userSchema);
