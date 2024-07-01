import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string({
      invalid_type_error: "username must be a string",
      required_error: "username is required",
    }),

    email: z
      .string({
        invalid_type_error: "email must be a string",
        required_error: "email is required",
      })
      .email(),
    password: z.string({
      invalid_type_error: "password must be a string",
      required_error: "password is required",
    }),
  }),
});

export const createLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: "email must be a string",
        required_error: "email is required",
      })
      .email(),
    password: z.string({
      invalid_type_error: "password must be a string",
      required_error: "password is required",
    }),
  }),
});
