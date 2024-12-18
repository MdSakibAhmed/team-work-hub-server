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
exports.docServices = void 0;
const document_model_1 = require("./document.model");
const server_1 = require("../../../server");
const createDocIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const documentRepo = server_1.AppDataSource.getRepository(document_model_1.Document);
    const document = new document_model_1.Document();
    document.title = payload.title;
    document.content = payload.content;
    documentRepo.save(document);
    return document;
});
const getAllDocsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const documentRepo = server_1.AppDataSource.getRepository(document_model_1.Document);
    const result = yield documentRepo.find();
    return result;
});
const deleteDocFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const documentRepo = server_1.AppDataSource.getRepository(document_model_1.Document);
    const document = yield documentRepo.findOneBy({ id });
    if (!document) {
        throw new Error("Document not found");
    }
    const result = yield documentRepo.remove(document);
    return result;
});
exports.docServices = {
    createDocIntoDB,
    getAllDocsFromDB,
    deleteDocFromDB,
};
