"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const route = (0, express_1.Router)();
route.post("/", (0, validateRequest_1.default)(category_validation_1.CategoriesValidations.createCategoryValidationSchema), category_controller_1.CategoriesController.createCategory);
route.get("/", category_controller_1.CategoriesController.getAllCategories);
exports.CategoryRoutes = route;
