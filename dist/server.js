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
exports.io = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const document_model_1 = require("./app/modules/document/document.model");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // your React app URL
        methods: ["GET", "POST"],
        credentials: true,
    },
});
exports.io.on("connection", (socket) => {
    console.log("New client connected");
    // Join a document room
    socket.on("joinDocument", (docId) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(docId);
        console.log(docId);
        const document = yield document_model_1.Document.findById(docId);
        socket.emit("loadDocument", document);
        console.log(document);
        //
        //   Listen for changes and broadcast to the room
        socket.on("sendChanges", (changes) => {
            console.log(changes);
            socket.broadcast.to(docId).emit("receiveChanges", changes);
        });
        // Save document content
        socket.on("saveDocument", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const newDoc = yield document_model_1.Document.findByIdAndUpdate(docId, {
                content: data.content,
            }, {
                runValidators: true,
                new: true,
            });
            console.log(newDoc);
        }));
        // live chat
        socket.on("message", (data) => {
            console.log("chat", data);
            exports.io.emit("message", data);
        });
    }));
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const isConnected = yield mongoose_1.default.connect(config_1.default.database_url);
    console.log("connected");
    server.listen(process.env.PORT || 5000, () => {
        console.log("listening ");
    });
});
main();
