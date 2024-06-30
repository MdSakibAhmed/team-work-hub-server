import { z } from "zod";

export const createFeedbackValidationSchema = z.object({
    body: z.object({
      userId: z.string({
        invalid_type_error: "userId must be a string",
        required_error: "userId is required",
      }),
  
      content: z.string({
        invalid_type_error: "content must be a string",
        required_error: "content is required",
      }),
    }),
  });