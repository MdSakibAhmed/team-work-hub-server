"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoginValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            invalid_type_error: "username must be a string",
            required_error: "username is required",
        }),
        email: zod_1.z
            .string({
            invalid_type_error: "email must be a string",
            required_error: "email is required",
        })
            .email(),
        password: zod_1.z.string({
            invalid_type_error: "password must be a string",
            required_error: "password is required",
        }),
    }),
});
exports.createLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            invalid_type_error: "email must be a string",
            required_error: "email is required",
        })
            .email(),
        password: zod_1.z.string({
            invalid_type_error: "password must be a string",
            required_error: "password is required",
        }),
    }),
});
