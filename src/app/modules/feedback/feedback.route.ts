import { Router } from "express";
import { feedbackControllers } from "./feedback.controller";
import validateRequest from "../../middleware/validateRequest";
import { createFeedbackValidationSchema } from "./feedback.validation";

const router = Router();

router.post(
  "/",
  validateRequest(createFeedbackValidationSchema),
  feedbackControllers.createFeedback
);
router.get("/", feedbackControllers.getAllFeedbacks);

const feedbackRoutes = router;

export default feedbackRoutes;
