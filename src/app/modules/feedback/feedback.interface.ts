import { ObjectId } from "mongoose";

export interface IFeedback {
  userId: ObjectId;
  documentId: ObjectId;
  content: string;
}
