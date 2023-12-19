import { RequestHandler } from "express";
import { CategoryServices } from "./category.service";
import catchAsync from "../../utiles/catchAsync";

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const categoryData = req.body;

  const newCategory = await CategoryServices.createCategoryIntoDB(categoryData);
  res.send({
    success: true,
    statusCode: 200,
    message: "Category created successfully",
    data: newCategory,
  });
});

const getAllCategories: RequestHandler = catchAsync( async (req, res) => {
    const newCategory = await CategoryServices.getAllCategoryFromDB();
    res.send({
      success: true,
      statusCode: 200,
      message: "Categories retrieved successfully",
      data: newCategory,
    });
 
});

export const CategoriesController = {
  createCategory,
  getAllCategories,
};
