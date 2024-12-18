"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    salt_rounds: process.env.SALT_ROUNDS,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    token_expires_time: process.env.TOKEN_EXPIRES_TIME,
    db_host: process.env.DB_HOST,
    db_type: process.env.DB_TYPE,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    database_host: process.env.DATABASE_HOST,
};
