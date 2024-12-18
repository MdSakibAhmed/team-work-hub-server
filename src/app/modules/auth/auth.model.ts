import { Schema, model } from "mongoose";
import { TAuth } from "./auth.interface";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Feedback } from "../feedback/feedback.model";

@Entity("auth")
export class Auth implements TAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 25 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Feedback, (feedback) => feedback.auth)
  feedbacks: Feedback[];
}

// const authSchema = new Schema<TAuth>(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },

//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// export const Auth = model<TAuth>("Auth", authSchema);
