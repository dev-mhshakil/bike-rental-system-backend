import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { BikeController } from './bike.controller';
import { BikeValidation } from './bike.validation';

const router = express.Router();

router.get('/', BikeController.getAllBikes);
router.get('/:id', BikeController.getBikeById);

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidation.createBikeValidation),
  BikeController.createBike,
);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidation.updateBikeValidation),
  BikeController.updateBikeById,
);

router.delete('/:id', auth(USER_ROLE.admin), BikeController.deleteBikeById);

export const BikeRoutes = router;
