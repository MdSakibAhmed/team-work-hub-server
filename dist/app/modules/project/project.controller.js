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
exports.projectControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utiles/catchAsync"));
const project_service_1 = require("./project.service");
const createProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = yield project_service_1.projectServices.createProjectIntoDB(req.body);
    res.send({
        success: true,
        statusCode: 201,
        message: "project created successfully",
        data: newProject,
    });
}));
const getAllProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield project_service_1.projectServices.getAllProjectsFromDB();
    res.send({
        success: true,
        statusCode: 200,
        message: "Projects retrieved successfully",
        data,
    });
}));
const updateProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    // console.log(req.body);
    const updatedCourse = yield project_service_1.projectServices.updateProjectIntoDB(courseId, req.body);
    res.send({
        success: true,
        statusCode: 200,
        message: "project updated successfully",
        data: updatedCourse,
    });
}));
const deleteProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    // console.log(req.body);
    const deletedProject = yield project_service_1.projectServices.deleteProjectFromDB(courseId);
    res.send({
        success: true,
        statusCode: 200,
        message: "project deleted successfully",
        data: null,
    });
}));
exports.projectControllers = {
    createProject,
    getAllProjects,
    updateProject,
    deleteProject,
};
