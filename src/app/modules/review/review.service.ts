
import { TReviews } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async (payload: TReviews) => {
  const newCourse = payload;
  const result = await Review.create(newCourse);
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
