import { Schema, model } from "mongoose";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Feedback } from "../feedback/feedback.model";
import { TDocument } from "./document.interface";

@Entity("documents")
export class Document implements TDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => Feedback, (feedback) => feedback.document)
  feedbacks: Feedback[];
}

// const DocumentSchema = new Schema<TDocument>(
//   {
//     title: {
//       type:String,
//       required:true
//   },
//     content: {
//         type:String,
//         required:true
//     }
//   },

//   {
//     versionKey: false,
//     timestamps:true
//   }
// );

// export const Document = model<TDocument>("Document", DocumentSchema);
