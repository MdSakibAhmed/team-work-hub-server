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
exports.docControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utiles/catchAsync"));
const document_service_1 = require("./document.service");
const createDoc = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newDoc = yield document_service_1.docServices.createDocIntoDB(req.body);
    res.send({
        success: true,
        statusCode: 201,
        message: "project created successfully",
        data: newDoc,
    });
}));
const getAllDocs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield document_service_1.docServices.getAllDocsFromDB();
    res.send({
        success: true,
        statusCode: 200,
        message: "Doc retrieved successfully",
        data,
    });
}));
const deleteDoc = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctId } = req.params;
    // console.log(req.body);
    const deletedProject = yield document_service_1.docServices.deleteDocFromDB(Number(doctId));
    res.send({
        success: true,
        statusCode: 200,
        message: "doc deleted successfully",
        data: null,
    });
}));
exports.docControllers = {
    createDoc,
    getAllDocs,
    deleteDoc,
};
