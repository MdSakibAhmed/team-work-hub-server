import { ObjectId, Types } from "mongoose";

export interface IProject {
  userId: ObjectId;
  title: string;
  description: string;
  documents: [TDocument];
}

export interface IDocument {
  content: string;

}


