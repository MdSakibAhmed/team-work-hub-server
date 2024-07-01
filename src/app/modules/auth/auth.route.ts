import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createLoginValidationSchema,
  createUserValidationSchema,
} from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  authControllers.register
);
router.post(
  "/login",
  validateRequest(createLoginValidationSchema),
  authControllers.login
);

const authRoutes = router;

export default authRoutes;
