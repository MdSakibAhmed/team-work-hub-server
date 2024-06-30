"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const project_validation_1 = require("./project.validation");
const project_controller_1 = require("./project.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(project_validation_1.createProjectValidationSchema), project_controller_1.projectControllers.createProject);
router.get("/", project_controller_1.projectControllers.getAllProjects);
router.patch("/:projectId", (0, validateRequest_1.default)(project_validation_1.updateProjectValidationSchema), project_controller_1.projectControllers.updateProject);
router.delete("/:projectId", project_controller_1.projectControllers.deleteProject);
exports.ProjectRoutes = router;
