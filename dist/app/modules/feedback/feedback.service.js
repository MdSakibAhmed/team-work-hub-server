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
exports.feedbackServices = void 0;
const server_1 = require("../../../server");
const auth_model_1 = require("../auth/auth.model");
const document_model_1 = require("../document/document.model");
const feedback_model_1 = require("./feedback.model");
const createFeedbackIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackRepo = server_1.AppDataSource.getRepository(feedback_model_1.Feedback);
    const authRepo = server_1.AppDataSource.getRepository(auth_model_1.Auth);
    const documentRepo = server_1.AppDataSource.getRepository(document_model_1.Document);
    const feedback = new feedback_model_1.Feedback();
    // assign body to feedback
    const feedbackBody = Object.assign(feedback, payload);
    const existingUser = yield authRepo.findOneBy({ id: Number(payload.userId) });
    if (!existingUser) {
        throw new Error("User does not exist");
    }
    feedbackBody.auth = existingUser;
    // save document id to feedback
    const existingDocument = yield documentRepo.findOneBy({
        id: Number(payload.documentId),
    });
    if (!existingDocument) {
        throw new Error("Document does not exist");
    }
    feedbackBody.document = existingDocument;
    const result = yield feedbackRepo.save(feedbackBody);
    return result;
});
const getAllFeedbacksFromDB = (documentId) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackRepo = server_1.AppDataSource.getRepository(feedback_model_1.Feedback);
    const result = yield feedbackRepo.find({
        relations: ["auth", "document"],
        where: {
            document: {
                id: documentId,
            },
        },
    });
    return result;
});
exports.feedbackServices = {
    createFeedbackIntoDB,
    getAllFeedbacksFromDB,
};
