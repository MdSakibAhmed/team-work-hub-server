import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { ReviewValidations } from "./review.validation";
import { ReviewController } from "./review.controller";

const router = Router();
router.post(
  "/",
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewController.createReview
);

export const ReviewRoutes = router;
