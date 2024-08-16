import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const bookingData = req.body;
  const result = await BookingService.createBookingIntoDB(
    token as string,
    bookingData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const returnBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.returnBookingIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking returned successfully',
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const result = await BookingService.getAllRentalsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals fetched successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  returnBooking,
  getAllRentals,
};
