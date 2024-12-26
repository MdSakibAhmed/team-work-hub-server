import { Router } from "express";
import { feedbackControllers } from "./feedback.controller";
import validateRequest from "../../middleware/validateRequest";
import { createFeedbackValidationSchema } from "./feedback.validation";
import { handleRedisCache } from "../../middleware/redisCacheHandler";

const router = Router();

router.post(
  "/",
  validateRequest(createFeedbackValidationSchema),
  feedbackControllers.createFeedback
);
router.get("/", handleRedisCache, feedbackControllers.getAllFeedbacks);

const feedbackRoutes = router;

export default feedbackRoutes;
