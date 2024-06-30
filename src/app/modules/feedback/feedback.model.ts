import { Schema, model } from "mongoose";
import { IFeedback } from "./feedback.interface";

const feedbackSchema = new Schema<IFeedback>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
      },
      documentId: {
        type:Schema.Types.ObjectId,
        ref:"Document"
      },
      content: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );


  export const Feedback = model<IFeedback>("Feedback", feedbackSchema);