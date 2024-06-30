"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
exports.Project = (0, mongoose_1.model)("Project", projectSchema);
// export const Document = model<IDocument>("Document", documentSchema);
