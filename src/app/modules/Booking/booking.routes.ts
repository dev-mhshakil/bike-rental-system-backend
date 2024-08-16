import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();

router.put('/:id', BookingController.returnBooking);

router.post('/', BookingController.createBooking);

export const BookingRoutes = router;
