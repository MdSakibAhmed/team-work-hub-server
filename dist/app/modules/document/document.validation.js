"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentValidationSchema = void 0;
const zod_1 = require("zod");
exports.createDocumentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: "title must be a string",
            required_error: "title is required",
        }),
        content: zod_1.z.string({
            invalid_type_error: "content must be a string",
            required_error: "content is required",
        }),
    }),
});
