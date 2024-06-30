import { Schema, model } from "mongoose";
import { TAuth } from "./auth.interface";


const authSchema = new Schema<TAuth>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

export const Auth = model<TAuth>("Auth", authSchema);
