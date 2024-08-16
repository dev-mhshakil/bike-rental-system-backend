import { model, Schema } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxLength: [50, 'Name can not exceed 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxLength: [200, 'Description can not exceed 200 characters'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
      min: [0, 'Price per hour must be a positive number'],
    },
    cc: {
      type: Number,
      required: [true, 'Engine capacity is required'],
      min: [100, 'Engine capacity must be at least 1000 cc'],
      max: [6000, 'Engine capacity must be at most 6000 cc'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1900, 'Year must be a valid year'],
      max: [new Date().getFullYear(), 'Year must be a current year'],
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
      maxLength: [50, 'Model can not exceed 50 characters'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      maxLength: [50, 'Brand can not exceed 50 characters'],
    },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Bike = model<TBike>('Bike', bikeSchema);
