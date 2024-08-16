import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Bike } from '../Bike/bike.model';
import { TBookingBike } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: TBookingBike) => {
  // Check if the bike is available
  const { bikeId, startTime } = payload;
  const bike = await Bike.findById(bikeId);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'bike not found');
  }

  if (!bike?.isAvailable) {
    throw new AppError(httpStatus.NOT_FOUND, 'bike not available');
  }

  // Create new booking
  const newBooking = new Booking({
    bikeId,
    startTime,
    returnTime: null,
    totalCost: 0,
    isReturned: false,
  });

  // Save the booking
  await newBooking.save();

  // Update bike availability
  bike.isAvailable = false;
  await bike.save();
  return newBooking;
};

const returnBookingIntoDB = async (id: string) => {
  const rental = await Booking.findById(id);

  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (rental.isReturned) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Bike is already returned');
  }

  // Fetch the bike using the bikeId from the rental
  const bike = await Bike.findById(rental.bikeId);

  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  // Calculate total cost
  const returnTime = new Date();
  const rentalDuration =
    (returnTime.getTime() - new Date(rental.startTime).getTime()) /
    (1000 * 60 * 60); // in hours
  const totalCost = rentalDuration * bike.pricePerHour;

  // Update rental and bike status
  rental.returnTime = returnTime;
  rental.totalCost = totalCost;
  rental.isReturned = true;
  await rental.save();

  bike.isAvailable = true;
  await bike.save();

  return rental;
};

export const BookingService = {
  createBookingIntoDB,
  returnBookingIntoDB,
};
