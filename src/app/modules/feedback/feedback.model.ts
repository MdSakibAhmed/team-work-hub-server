import { Schema, model } from "mongoose";
import { IFeedback } from "./feedback.interface";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "../auth/auth.model";
import { Document } from "../document/document.model";

@Entity("feedback")
export class Feedback implements IFeedback {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Auth, (auth) => auth.feedbacks)
  auth: Auth;

  @ManyToOne(() => Document, (document) => document.feedbacks)
  document: Document;

  @Column()
  content: string;
}
// const feedbackSchema = new Schema<IFeedback>(
//     {
//       userId: {
//         type: Schema.Types.ObjectId,
//         ref: "Auth",
//       },
//       documentId: {
//         type:Schema.Types.ObjectId,
//         ref:"Document"
//       },
//       content: {
//         type: String,
//         required: true,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

// export const Feedback = model<IFeedback>("Feedback", feedbackSchema);
