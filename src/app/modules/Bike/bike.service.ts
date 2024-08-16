import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  const bikeData: TBike = {
    ...payload,
    isAvailable: true, // Explicitly add isAvailable
  };

  const newBike = await Bike.create(bikeData);
  return newBike;
};

const getAllBikesFromDB = async () => {
  const bikes = await Bike.find({});
  return bikes;
};

const getBikeByIdFromDB = async (id: string) => {
  const bike = await Bike.findById(id);
  return bike;
};

const updateBikeInDB = async (id: string, payload: Partial<TBike>) => {
  const updatedBike = await Bike.findByIdAndUpdate(id, payload, { new: true });
  return updatedBike;
};

const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getBikeByIdFromDB,
  updateBikeInDB,
  deleteBikeFromDB,
};
