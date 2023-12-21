import { Schema, model } from "mongoose";
import { TReviews } from "./review.interface";

const ReviewSchema = new Schema<TReviews>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    rating: {
      type: Number,
      enum:[1,2,3,4,5],
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export const Review = model<TReviews>("Review", ReviewSchema);
