import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    name: z.string(),
    email: z.string().email('Email is not valid'),
    phone: z.string().min(1, 'Contact Number is required'),
    address: z.string().min(5, 'Address is required'),
    role: z.enum(['user', 'admin']).default('user'),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email('Email is not valid').optional(),
    phone: z.string().min(1, 'Contact Number is required').optional(),
    address: z.string().min(5, 'Address is required').optional(),
    role: z.enum(['user', 'admin']).optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
