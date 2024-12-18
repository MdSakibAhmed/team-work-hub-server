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
exports.Document = void 0;
const typeorm_1 = require("typeorm");
const feedback_model_1 = require("../feedback/feedback.model");
let Document = class Document {
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Document.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_model_1.Feedback, (feedback) => feedback.document),
    __metadata("design:type", Array)
], Document.prototype, "feedbacks", void 0);
exports.Document = Document = __decorate([
    (0, typeorm_1.Entity)("documents")
], Document);
// const DocumentSchema = new Schema<TDocument>(
//   {
//     title: {
//       type:String,
//       required:true
//   },
//     content: {
//         type:String,
//         required:true
//     }
//   },
//   {
//     versionKey: false,
//     timestamps:true
//   }
// );
// export const Document = model<TDocument>("Document", DocumentSchema);
