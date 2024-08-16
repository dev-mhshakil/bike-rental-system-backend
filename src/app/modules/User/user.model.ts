import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
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
