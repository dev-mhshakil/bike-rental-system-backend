import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post('/auth/login', UserController.loginUser);

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);

router.post(
  '/auth/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser,
);

router.put(
  '/:id',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUserById,
);

router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
