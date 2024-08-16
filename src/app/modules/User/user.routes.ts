import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post('/auth/login', UserController.loginUser);

router.get('/users/me', UserController.getProfile);

router.post(
  '/auth/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser,
);

router.put(
  '/users/me',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUserById,
);

export const UserRoutes = router;
