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
exports.AppDataSource = void 0;
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const document_model_1 = require("./app/modules/document/document.model");
const auth_model_1 = require("./app/modules/auth/auth.model");
const feedback_model_1 = require("./app/modules/feedback/feedback.model");
exports.AppDataSource = new typeorm_1.DataSource({
    url: config_1.default.database_url,
    host: config_1.default.db_host,
    type: "postgres",
    username: config_1.default.db_username,
    password: config_1.default.db_password,
    database: config_1.default.db_host,
    entities: [document_model_1.Document, auth_model_1.Auth, feedback_model_1.Feedback],
    synchronize: true,
});
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://classy-malabi-4cf0a2.netlify.app",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
// connect Socket io
// connectSocket(io);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // const isConnected = await mongoose.connect(config.database_url as string);
    // console.log("connected");
    // server.listen(process.env.PORT || 5000, () => {
    //   console.log(`listenig on ${process.env.PORT || 5000}`);
    // });
    exports.AppDataSource.initialize()
        .then(() => {
        console.log("Data Source has been initialized!");
    })
        .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
});
main();
