import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

const authRoutes = router;

export default authRoutes;
