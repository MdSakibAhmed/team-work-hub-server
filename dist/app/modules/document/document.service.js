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
const createDocIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield document_model_1.Document.create(payload);
    return result;
});
const getAllDocsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield document_model_1.Document.find();
    return result;
});
const editDocIntoDB = (documentId, data) => __awaiter(void 0, void 0, void 0, function* () {
});
const deleteDocFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = document_model_1.Document.findByIdAndDelete(id);
    return result;
});
exports.docServices = {
    createDocIntoDB,
    getAllDocsFromDB,
    editDocIntoDB,
    deleteDocFromDB,
};
