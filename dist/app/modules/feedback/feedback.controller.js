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
exports.feedbackControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utiles/catchAsync"));
const feedback_service_1 = require("./feedback.service");
const createFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newDoc = yield feedback_service_1.feedbackServices.createFeedbackIntoDB(req.body);
    res.send({
        success: true,
        statusCode: 201,
        message: "feedback created successfully",
        data: newDoc,
    });
}));
const getAllFeedbacks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { documentId } = req.query;
    const data = yield feedback_service_1.feedbackServices.getAllFeedbacksFromDB(Number(documentId));
    console.log(data);
    res.send({
        success: true,
        statusCode: 200,
        message: "Feedback retrieved successfully",
        data,
    });
}));
exports.feedbackControllers = {
    createFeedback,
    getAllFeedbacks,
};
