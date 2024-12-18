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
Object.defineProperty(exports, "__esModule", { value: true });
const document_model_1 = require("../app/modules/document/document.model");
const server_1 = require("../server");
const connectSocket = (io) => {
    const documentRepo = server_1.AppDataSource.getRepository(document_model_1.Document);
    io.on("connection", (socket) => {
        console.log("New client connected");
        // Join a document room
        socket.on("joinDocument", (docId) => __awaiter(void 0, void 0, void 0, function* () {
            socket.join(docId);
            const document = yield documentRepo.findOneBy({ id: docId });
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
                const newDoc = yield documentRepo.update({ id: docId }, {
                    content: data.content,
                });
                // const newDoc = await Document.findByIdAndUpdate(
                //   docId,
                //   {
                //     content: data.content,
                //   },
                //   {
                //     runValidators: true,
                //     new: true,
                //   }
                // );
                console.log(newDoc);
            }));
            // live chat
            socket.on("message", (data) => {
                console.log("chat", data);
                io.emit("message", data);
            });
        }));
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};
exports.default = connectSocket;
