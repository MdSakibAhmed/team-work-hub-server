import { RequestHandler } from "express";
import catchAsync from "../../utiles/catchAsync";
import { feedbackServices } from "./feedback.service";

const createFeedback: RequestHandler = catchAsync(async (req, res) => {
  const newDoc = await feedbackServices.createFeedbackIntoDB(req.body);

  res.send({
    success: true,
    statusCode: 201,
    message: "feedback created successfully",
    data: newDoc,
  });
});

const getAllFeedbacks: RequestHandler = catchAsync(async (req, res) => {
  const { documentId } = req.query;
  console.log("docID",documentId);
  const data = await feedbackServices.getAllFeedbacksFromDB(
    documentId as string
  );
console.log(data);
  res.send({
    success: true,
    statusCode: 200,
    message: "Feedback retrieved successfully",
    data,
  });
});

export const feedbackControllers = {
  createFeedback,
  getAllFeedbacks,
};
