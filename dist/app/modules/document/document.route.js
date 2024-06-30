"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const project_validation_1 = require("../project/project.validation");
const document_controller_1 = require("./document.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(project_validation_1.createDocumentValidationSchema), document_controller_1.docControllers.createDoc);
router.get("/", document_controller_1.docControllers.getAllDocs);
router.patch("/:docId", (0, validateRequest_1.default)(project_validation_1.updateDocumentValidationSchema), document_controller_1.docControllers.editDoc);
router.delete("/:docId", document_controller_1.docControllers.deleteDoc);
const documentRoutes = router;
exports.default = documentRoutes;
