import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";

import {
  createProjectValidationSchema,
  updateProjectValidationSchema,
} from "./project.validation";
import { projectControllers } from "./project.controller";

const router = Router();

router.post(
  "/",
  validateRequest(createProjectValidationSchema),
  projectControllers.createProject
);

router.get("/", projectControllers.getAllProjects);
router.patch(
  "/:projectId",
  validateRequest(updateProjectValidationSchema),
  projectControllers.updateProject
);

router.delete("/:projectId", projectControllers.deleteProject);

export const ProjectRoutes = router;
