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
exports.authControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utiles/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const login = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, userWithoutPass } = yield auth_service_1.authServices.loginFromDB(req.body);
    const data = Object.assign({ token }, userWithoutPass);
    res.send({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "user logged in  successfully",
        data,
    });
}));
const register = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    const { token, userWithoutPass } = yield auth_service_1.authServices.registerIntoDB(newUser);
    const data = Object.assign({ token }, userWithoutPass);
    res.send({
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "user registered successfully",
        data,
    });
}));
exports.authControllers = {
    login,
    register,
};
