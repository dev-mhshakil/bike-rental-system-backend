import { model, Schema, Types } from 'mongoose';

const bookingSchema = new Schema({
  bikeId: { type: Types.ObjectId, ref: 'Bike', required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  returnTime: { type: Date },
  totalCost: { type: Number },
  isReturned: { type: Boolean },
});

export const Booking = model('Booking', bookingSchema);
