"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedbackValidationSchema = void 0;
const zod_1 = require("zod");
exports.createFeedbackValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            invalid_type_error: "userId must be a string",
            required_error: "userId is required",
        }),
        content: zod_1.z.string({
            invalid_type_error: "content must be a string",
            required_error: "content is required",
        }),
    }),
});
