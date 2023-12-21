import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const CategorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Category = model<TCategory>("Category", CategorySchema);