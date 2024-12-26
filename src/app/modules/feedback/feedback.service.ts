import { FindOperator } from "typeorm";
import { AppDataSource, redisClient } from "../../../server";
import { Auth } from "../auth/auth.model";
import { Document } from "../document/document.model";
import { IFeedback } from "./feedback.interface";
import { Feedback } from "./feedback.model";

const createFeedbackIntoDB = async (
  payload: IFeedback,
  originalUrl: string
) => {
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

  // invalid redis cache
  await redisClient.del(originalUrl);

  return result;
};
const getAllFeedbacksFromDB = async (
  documentId: number | FindOperator<number>,
  originalUrl: string
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

  // store redis cache
  await redisClient.set(originalUrl, JSON.stringify(result), "EX", 60);
  return result;
};

export const feedbackServices = {
  createFeedbackIntoDB,
  getAllFeedbacksFromDB,
};
