import mongoose, { Schema, Document } from "mongoose";

interface ICafe extends Document {
  reservation: mongoose.Types.ObjectId[];
  name: string;
  meal: mongoose.Types.ObjectId[];
  isVerified: boolean;
  email: string;
  phone: string;
  password: string;
  token: string;
  salt: string;
  profileImage: string;
  dateCreate: Date;
  dateUpdate: Date;
  customer: mongoose.Types.ObjectId[];
}

const CafeSchema: Schema = new Schema<ICafe>({
  reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
  meal: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  isVerified: { type: Boolean, default: false },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: true },
  token: { type: String, required: true },
  salt: { type: String, required: true },
  dateCreate: { type: Date, default: Date.now },
  dateUpdate: { type: Date, default: Date.now },
  customer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
});

export const Cafe = mongoose.model<ICafe>("Cafe", CafeSchema);
