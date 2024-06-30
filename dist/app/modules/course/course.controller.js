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
exports.CourseControllers = void 0;
const course_service_1 = require("./course.service");
const catchAsync_1 = __importDefault(require("../../utiles/catchAsync"));
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = yield course_service_1.CourseServices.createCourseIntoDB(req.body);
    res.send({
        success: true,
        statusCode: 201,
        message: "Course created successfully",
        data: newCourse,
    });
}));
const getAllcourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, data } = yield course_service_1.CourseServices.getAllCourseFromDB(req.query);
    res.send({
        success: true,
        statusCode: 200,
        message: "Courses retrieved successfully",
        meta,
        data,
    });
}));
const updateCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    // console.log(req.body);
    const updatedCourse = yield course_service_1.CourseServices.updateCourseIntoDB(courseId, req.body);
    res.send({
        success: true,
        statusCode: 200,
        message: "Course updated successfully",
        data: updatedCourse,
    });
}));
const getCourseWithReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const courseWithReviews = yield course_service_1.CourseServices.getCourseWithReviewsFromDB(courseId);
    res.send({
        success: true,
        statusCode: 200,
        message: "Course and Reviews retrieved successfully",
        data: courseWithReviews,
    });
}));
const getBestCourseBasedOnAvarage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const [data] = yield course_service_1.CourseServices.getBestCourseBasedOnAvarageFromDB();
    console.log(data);
    const responsObj = {
        course: data === null || data === void 0 ? void 0 : data.course[0],
        averageRating: (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.averageRating,
        reviewCount: (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.reviewCount,
    };
    res.send({
        success: true,
        statusCode: 200,
        message: "Best course retrieved successfully",
        data: responsObj,
    });
}));
exports.CourseControllers = {
    createCourse,
    getAllcourses,
    updateCourse,
    getCourseWithReviews,
    getBestCourseBasedOnAvarage,
};
