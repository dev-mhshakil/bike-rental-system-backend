import { Model, ObjectId } from 'mongoose';

export type TBike = {
  _id: ObjectId;
  name: string;
  description: string;
  pricePerHour: number;
  cc: number;
  year: number;
  model: string;
  brand: string;
  isAvailable: boolean;
};

export type BikeModel = Model<TBike>;
