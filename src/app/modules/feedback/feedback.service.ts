import { FindOperator } from "typeorm";
import { AppDataSource } from "../../../server";
import { Auth } from "../auth/auth.model";
import { Document } from "../document/document.model";
import { IFeedback } from "./feedback.interface";
import { Feedback } from "./feedback.model";

const createFeedbackIntoDB = async (payload: IFeedback) => {
  const feedbackRepo = AppDataSource.getRepository(Feedback);
  const authRepo = AppDataSource.getRepository(Auth);
  const documentRepo = AppDataSource.getRepository(Document);
  const feedback = new Feedback();
  // assign body to feedback
  const feedbackBody = Object.assign(feedback, payload);

  const existingUser = await authRepo.findOneBy({ id: Number(payload.userId) });
  if (!existingUser) {
    throw new Error("User does not exist");
  }
  feedbackBody.auth = existingUser;
  // save document id to feedback
  const existingDocument = await documentRepo.findOneBy({
    id: Number(payload.documentId),
  });
  if (!existingDocument) {
    throw new Error("Document does not exist");
  }
  feedbackBody.document = existingDocument;
  const result = await feedbackRepo.save(feedbackBody);

  return result;
};
const getAllFeedbacksFromDB = async (
  documentId: number | FindOperator<number>
) => {
  const feedbackRepo = AppDataSource.getRepository(Feedback);
  const result = await feedbackRepo.find({
    relations: ["auth", "document"],
    where: {
      document: {
        id: documentId,
      },
    },
  });
  return result;
};

export const feedbackServices = {
  createFeedbackIntoDB,
  getAllFeedbacksFromDB,
};
