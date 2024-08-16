import { z } from 'zod';

const bookingBikeValidation = z.object({
  body: z.object({
    bikeId: z.string(),
    startTIme: z.date(),
  }),
});

const returnBikeValidation = z.object({
  body: z.object({
    bikeId: z.string(),
    returnTime: z.date(),
  }),
});

export const BookingBikeValidation = {
  bookingBikeValidation,
  returnBikeValidation,
};
