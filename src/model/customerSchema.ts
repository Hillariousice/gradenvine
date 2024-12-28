import mongoose, { Schema, Document } from "mongoose";


interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  reservation: mongoose.Types.ObjectId[];
  meal: mongoose.Types.ObjectId[];
  reviews: mongoose.Types.ObjectId[];
  isVerified: boolean;
  email: string;
  phone: string;
  token: string;
  salt: string;
  password: string;
  dateCreate: Date;
  dateUpdate: Date;
  profileImage: string;
}

const CustomerSchema: Schema = new Schema<ICustomer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  token: { type: String, required: true },
  profileImage: { type: String, required: true },
  reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
  meal: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  isVerified: { type: Boolean, default: false },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateCreate: { type: Date, default: Date.now },
  dateUpdate: { type: Date, default: Date.now },
});

export const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
