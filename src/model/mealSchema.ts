import mongoose, { Schema, Document } from "mongoose";

interface IMeal extends Document {
  mainCourse: string[];
  desert: string[];
  sweetener: string[];
  drink: string[];
  isAvailable: boolean;
  timeOfDelivery: string;
}

const MealSchema: Schema = new Schema<IMeal>({
  mainCourse: [{ type: String, required: true }],
  desert: [{ type: String, required: true }],
  sweetener: [{ type: String, required: true }],
  drink: [{ type: String, required: true }],
  isAvailable: { type: Boolean, default: true },
  timeOfDelivery: { type: String, required: true },
});

export const Meal = mongoose.model<IMeal>("Meal", MealSchema);
