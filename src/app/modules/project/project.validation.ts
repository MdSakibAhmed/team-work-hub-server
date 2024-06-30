import { z } from "zod";


const feedbackValidationSchema = z.object({
  userId: z.string({
    invalid_type_error: "title must be a string",
    required_error: "title is required",
  }),

  content: z.string({
    invalid_type_error: "title must be a string",
    required_error: "title is required",
  }),
});
const documentValidationSchema = z.object({
  content: z.string({
    invalid_type_error: "content must be a string",
    required_error: "content is required",
  }),
  feddbacks: z.array(feedbackValidationSchema).optional(),
});

export const updateDocumentValidationSchema = z.object({
  body: z.object({
    content: z.string({
      invalid_type_error: "content must be a string",
      required_error: "content is required",
    }),
    feddbacks: z.array(feedbackValidationSchema).optional(),
  }),
});

export const createDocumentValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: "title must be a string",
      required_error: "title is required",
    }).optional(),

    content: z.string({
      invalid_type_error: "content must be a string",
      required_error: "content is required",
    }),
  }),
});

export const createProjectValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      invalid_type_error: "userId must be a string",
      required_error: "userId is required",
    }),
    title: z.string({
      invalid_type_error: "title must be a string",
      required_error: "title is required",
    }),

    description: z.string({
      invalid_type_error: "description must be a string",
      required_error: "description is required",
    }),
    documents: z.array(documentValidationSchema).optional(),
  }),
});

export const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: "title must be a string",
        required_error: "title is required",
      })
      .optional(),

    description: z
      .string({
        invalid_type_error: "description must be a string",
        required_error: "description is required",
      })
      .optional(),
    documents: z.array(documentValidationSchema).optional(),
  }),
});
