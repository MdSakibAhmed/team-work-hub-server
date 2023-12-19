import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";

const router = Router();

router.post(
  "/course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.get("/courses", CourseControllers.getAllcourses);
router.put(
  "/courses/:courseId",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);
router.get(
  "/courses/:courseId/reviews",
  CourseControllers.getCourseWithReviews
);
router.get("/course/best",CourseControllers.getBestCourseBasedOnAvarage)

export const CourseRoutes = router;
