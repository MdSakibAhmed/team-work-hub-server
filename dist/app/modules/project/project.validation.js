"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectValidationSchema = exports.createProjectValidationSchema = exports.createDocumentValidationSchema = exports.updateDocumentValidationSchema = void 0;
const zod_1 = require("zod");
const feedbackValidationSchema = zod_1.z.object({
    userId: zod_1.z.string({
        invalid_type_error: "title must be a string",
        required_error: "title is required",
    }),
    content: zod_1.z.string({
        invalid_type_error: "title must be a string",
        required_error: "title is required",
    }),
});
const documentValidationSchema = zod_1.z.object({
    content: zod_1.z.string({
        invalid_type_error: "content must be a string",
        required_error: "content is required",
    }),
    feddbacks: zod_1.z.array(feedbackValidationSchema).optional(),
});
exports.updateDocumentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string({
            invalid_type_error: "content must be a string",
            required_error: "content is required",
        }),
        feddbacks: zod_1.z.array(feedbackValidationSchema).optional(),
    }),
});
exports.createDocumentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: "title must be a string",
            required_error: "title is required",
        }).optional(),
        content: zod_1.z.string({
            invalid_type_error: "content must be a string",
            required_error: "content is required",
        }),
    }),
});
exports.createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            invalid_type_error: "userId must be a string",
            required_error: "userId is required",
        }),
        title: zod_1.z.string({
            invalid_type_error: "title must be a string",
            required_error: "title is required",
        }),
        description: zod_1.z.string({
            invalid_type_error: "description must be a string",
            required_error: "description is required",
        }),
        documents: zod_1.z.array(documentValidationSchema).optional(),
    }),
});
exports.updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            invalid_type_error: "title must be a string",
            required_error: "title is required",
        })
            .optional(),
        description: zod_1.z
            .string({
            invalid_type_error: "description must be a string",
            required_error: "description is required",
        })
            .optional(),
        documents: zod_1.z.array(documentValidationSchema).optional(),
    }),
});
