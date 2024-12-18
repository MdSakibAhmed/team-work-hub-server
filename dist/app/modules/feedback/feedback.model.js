"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const typeorm_1 = require("typeorm");
const auth_model_1 = require("../auth/auth.model");
const document_model_1 = require("../document/document.model");
let Feedback = class Feedback {
};
exports.Feedback = Feedback;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Feedback.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_model_1.Auth, (auth) => auth.feedbacks),
    __metadata("design:type", auth_model_1.Auth)
], Feedback.prototype, "auth", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_model_1.Document, (document) => document.feedbacks),
    __metadata("design:type", document_model_1.Document)
], Feedback.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Feedback.prototype, "content", void 0);
exports.Feedback = Feedback = __decorate([
    (0, typeorm_1.Entity)("feedback")
], Feedback);
// const feedbackSchema = new Schema<IFeedback>(
//     {
//       userId: {
//         type: Schema.Types.ObjectId,
//         ref: "Auth",
//       },
//       documentId: {
//         type:Schema.Types.ObjectId,
//         ref:"Document"
//       },
//       content: {
//         type: String,
//         required: true,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );
// export const Feedback = model<IFeedback>("Feedback", feedbackSchema);
