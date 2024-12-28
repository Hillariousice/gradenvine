import mongoose, { Schema, Document } from "mongoose";


interface IReservation extends Document {
  time: string;
  dateOfBooking: Date;
  cancelOfBooking: Date;
  venue: string[];
  table: string;
  reviews: mongoose.Types.ObjectId[];
}

const ReservationSchema: Schema = new Schema<IReservation>({
  time: { type: String, required: true },
  dateOfBooking: { type: Date, required: true },
  cancelOfBooking: { type: Date, required: true },
  table: { type: String, required: true },
  venue: [{ type: String, required: true }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export const Reservation = mongoose.model<IReservation>(
  "Reservation",
  ReservationSchema
);
