import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CategoriesValidations } from "./category.validation";
import { CategoriesController } from "./category.controller";

const route = Router();

route.post(
  "/",
  validateRequest(CategoriesValidations.createCategoryValidationSchema),
  CategoriesController.createCategory
);

route.get("/", CategoriesController.getAllCategories);

export const CategoryRoutes = route;
