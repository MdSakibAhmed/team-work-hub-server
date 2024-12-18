import { Router } from "express";
import documentRoutes from "../modules/document/document.route";
import authRoutes from "../modules/auth/auth.route";
import feedbackRoutes from "../modules/feedback/feedback.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },

  {
    path: "/document",
    route: documentRoutes,
  },
  {
    path: "/feedback",
    route: feedbackRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
