import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(20, 'First Name cannot exceed 20 characters')
    .regex(/^[A-Z]/, 'First Name should start with a capital letter'),
  middleName: z
    .string()
    .max(20, 'Middle Name cannot exceed 20 characters')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .max(20, 'Last Name cannot exceed 20 characters')
    .regex(
      /^[A-Za-z]*$/,
      'Last Name should only contain alphabetic characters',
    ),
});

const createUserValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    name: userNameValidationSchema,
    email: z.string().email('Email is not valid'),
    phone: z.string().min(1, 'Contact Number is required'),
    address: z.string().min(5, 'Address is required'),
    role: z.enum(['user', 'admin']).default('user'),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    password: z.string().min(8).max(16),
    name: updateUserNameValidationSchema,
    email: z.string().email('Email is not valid'),
    phone: z.string().min(1, 'Contact Number is required'),
    address: z.string().min(5, 'Address is required'),
    role: z.enum(['student', 'teacher', 'admin']).default('student'),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
