"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const category_service_1 = require("./category.service");
const catchAsync_1 = __importDefault(require("../../utiles/catchAsync"));
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = req.body;
    const newCategory = yield category_service_1.CategoryServices.createCategoryIntoDB(categoryData);
    res.send({
        success: true,
        statusCode: 201,
        message: "Category created successfully",
        data: newCategory,
    });
}));
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield category_service_1.CategoryServices.getAllCategoryFromDB();
    res.send({
        success: true,
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: newCategory,
    });
}));
exports.CategoriesController = {
    createCategory,
    getAllCategories,
};
