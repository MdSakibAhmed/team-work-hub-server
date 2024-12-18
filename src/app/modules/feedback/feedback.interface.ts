import { ObjectId } from "mongoose";
import { Auth } from "../auth/auth.model";
import { Document } from "../document/document.model";
import { FindOperator } from "typeorm";

export interface IFeedback {
  userId?: number | FindOperator<number>;
  documentId?: number | FindOperator<number>;
  auth: Auth;
  document: Document;
  content: string;
}
