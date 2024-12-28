import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
  rating: number;
  comment: string;
}

const ReviewSchema: Schema = new Schema<IReview>({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
