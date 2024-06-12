import { Schema, model } from 'mongoose';
import { CarServiceModel, ICarService } from './carService.interface';

const carServiceSchema = new Schema<ICarService, CarServiceModel>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

carServiceSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carServiceSchema.statics.isServiceExists = async function (name: string) {
  return await CarService.findOne({ name });
};

export const CarService = model<ICarService, CarServiceModel>(
  'CarService',
  carServiceSchema,
);
