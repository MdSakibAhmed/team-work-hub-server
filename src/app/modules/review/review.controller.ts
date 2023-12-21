import { RequestHandler } from "express";
import { ReviewServices } from "./review.service";
import catchAsync from "../../utiles/catchAsync";

const createReview: RequestHandler = catchAsync(async (req, res ) => {
  const newReview = await ReviewServices.createReviewIntoDB(req.body);
  res.send({
    success: true,
    statusCode: 201,
    message: "Review created successfully",
    data: newReview,
  });
});

export const ReviewController = {
  createReview,
};
