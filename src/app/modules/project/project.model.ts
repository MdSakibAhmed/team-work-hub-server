import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";





const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Project = model<IProject>("Project", projectSchema);
// export const Document = model<IDocument>("Document", documentSchema);

