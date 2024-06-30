import { IFeedback } from "./feedback.interface";
import { Feedback } from "./feedback.model";

const createFeedbackIntoDB = async (payload: IFeedback) => {
  const result = await Feedback.create(payload);
  return result;
};
const getAllFeedbacksFromDB = async (documentId:string) => {
    const result = await Feedback.find({documentId}).populate("userId");
    return result;
  };
  
export const feedbackServices = {
  createFeedbackIntoDB,
  getAllFeedbacksFromDB
};
