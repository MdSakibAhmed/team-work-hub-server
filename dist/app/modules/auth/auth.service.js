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
exports.authServices = void 0;
const auth_model_1 = require("./auth.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const excludeField_1 = __importDefault(require("../../../utils/excludeField"));
const config_1 = __importDefault(require("../../config"));
const loginFromDB = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password: plainTextPass } = payLoad;
    const user = yield auth_model_1.Auth.findOne({ email });
    if (!user) {
        throw new Error("user not found ");
    }
    // match password
    const isMatched = yield bcrypt_1.default.compare(plainTextPass, user.password);
    if (!isMatched) {
        throw new Error("incorrect password ");
    }
    // genarate token for this user
    const payLoadForToken = {
        userId: user.id,
        email,
    };
    const token = jsonwebtoken_1.default.sign(payLoadForToken, process.env.JWT_SECRET_KEY, { algorithm: "HS256", expiresIn: process.env.TOKEN_EXPIRES_TIME });
    const userWithoutPass = (0, excludeField_1.default)(user, ["password"]);
    return {
        userWithoutPass,
        token,
    };
});
const registerIntoDB = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payLoad);
    const hassedPassword = yield bcrypt_1.default.hash(payLoad.password, Number(process.env.SALT_ROUNDS));
    payLoad.password = hassedPassword;
    const user = yield auth_model_1.Auth.create(payLoad);
    const payLoadForToken = {
        userId: user._id,
        email: user.email,
    };
    console.log(payLoadForToken);
    const token = jsonwebtoken_1.default.sign(payLoadForToken, config_1.default.jwt_secret_key, {
        algorithm: "HS256",
        expiresIn: process.env.TOKEN_EXPIRES_TIME,
    });
    const userWithoutPass = (0, excludeField_1.default)(user, ["password"]);
    return { userWithoutPass, token };
});
exports.authServices = {
    loginFromDB,
    registerIntoDB,
};
