import express from 'express';
import { BikeRoutes } from '../modules/Bike/bike.routes';
import { BookingRoutes } from '../modules/Booking/booking.routes';
import { UserRoutes } from '../modules/User/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
