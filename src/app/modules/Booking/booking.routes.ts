import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();

router.get('/', BookingController.getAllRentals);

router.put('/:id/return', BookingController.returnBooking);

router.post('/', BookingController.createBooking);

export const BookingRoutes = router;
