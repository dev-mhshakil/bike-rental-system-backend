import { ObjectId, Types } from 'mongoose';

export type TBookingBike = {
  _id: ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime?: Date;
  totalCost?: number;
  isReturned: boolean;
};
