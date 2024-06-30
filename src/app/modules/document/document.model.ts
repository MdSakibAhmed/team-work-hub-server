import { Schema, model } from "mongoose";


const DocumentSchema = new Schema<TDocument>(
  {
    title: {
      type:String,
      required:true
  },
    content: {
        type:String,
        required:true
    }
  },
  
  {
    versionKey: false,
    timestamps:true
  }
);

export const Document = model<TDocument>("Document", DocumentSchema);
