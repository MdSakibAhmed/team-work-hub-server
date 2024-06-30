"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedback_controller_1 = require("./feedback.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const feedback_validation_1 = require("./feedback.validation");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(feedback_validation_1.createFeedbackValidationSchema), feedback_controller_1.feedbackControllers.createFeedback);
router.get("/", feedback_controller_1.feedbackControllers.getAllFeedbacks);
const feedbackRoutes = router;
exports.default = feedbackRoutes;
