import { z } from "zod";

export const createDocumentValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: "title must be a string",
      required_error: "title is required",
    }),

    content: z.string({
      invalid_type_error: "content must be a string",
      required_error: "content is required",
    }),
  }),
});
