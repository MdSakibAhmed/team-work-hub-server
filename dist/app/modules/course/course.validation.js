"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidations = void 0;
const zod_1 = require("zod");
const tagSchemaValidation = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "name must be a string",
        required_error: "name is required",
    }),
    isDeleted: zod_1.z
        .boolean({
        invalid_type_error: "isDeleted must be a boolean",
        required_error: "isDeleted is required",
    })
        .optional(),
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: "title must be a string",
            required_error: "title is required",
        }),
        instructor: zod_1.z.string({
            invalid_type_error: "instructor must be a string",
            required_error: "instructor is required",
        }),
        categoryId: zod_1.z.string({
            invalid_type_error: "categoryId must be a string",
            required_error: "categoryId is required",
        }),
        price: zod_1.z.number({
            invalid_type_error: "price must be a number",
            required_error: "price is required",
        }),
        tags: zod_1.z.array(tagSchemaValidation),
        startDate: zod_1.z.string({
            invalid_type_error: "startDate must be a string",
            required_error: "startDate is required",
        }),
        endDate: zod_1.z.string({
            invalid_type_error: "endDate must be a string",
            required_error: "endDate is required",
        }),
        language: zod_1.z.string({
            invalid_type_error: "language must be a string",
            required_error: "language is required",
        }),
        provider: zod_1.z.string({
            invalid_type_error: "provider must be a string",
            required_error: "provider is required",
        }),
        details: zod_1.z.object({
            level: zod_1.z.string({
                invalid_type_error: "level must be a string",
                required_error: "level is required",
            }),
            description: zod_1.z.string({
                invalid_type_error: "description must be a string",
                required_error: "description is required",
            }),
        }),
    }),
});
// for update 
const updateTagSchemaValidation = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: "name must be a string",
    })
        .optional(),
    isDeleted: zod_1.z
        .boolean({
        invalid_type_error: "isDeleted must be a boolean",
    })
        .optional(),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            invalid_type_error: "title must be a string",
        })
            .optional(),
        instructor: zod_1.z
            .string({
            invalid_type_error: "instructor must be a string",
        })
            .optional(),
        categoryId: zod_1.z
            .string({
            invalid_type_error: "categoryId must be a string",
        })
            .optional(),
        price: zod_1.z
            .number({
            invalid_type_error: "price must be a number",
        })
            .optional(),
        tags: zod_1.z.array(updateTagSchemaValidation).optional(),
        startDate: zod_1.z
            .string({
            invalid_type_error: "startDate must be a string",
        })
            .optional(),
        endDate: zod_1.z
            .string({
            invalid_type_error: "endDate must be a string",
        })
            .optional(),
        language: zod_1.z
            .string({
            invalid_type_error: "language must be a string",
        })
            .optional(),
        provider: zod_1.z
            .string({
            invalid_type_error: "provider must be a string",
        })
            .optional(),
        durationInWeeks: zod_1.z.number().optional(),
        details: zod_1.z
            .object({
            level: zod_1.z
                .string({
                invalid_type_error: "level must be a string",
            })
                .optional(),
            description: zod_1.z
                .string({
                invalid_type_error: "description must be a string",
            })
                .optional(),
        })
            .optional(),
    }),
});
exports.CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};
