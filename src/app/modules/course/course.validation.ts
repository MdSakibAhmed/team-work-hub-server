import { z } from "zod";
const tagSchemaValidation = z.object({
  name: z.string({
    invalid_type_error: "name must be a string",
    required_error: "name is required",
  }),
  isDeleted: z
    .boolean({
      invalid_type_error: "isDeleted must be a boolean",
      required_error: "isDeleted is required",
    })
    .optional(),
});
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: "title must be a string",
      required_error: "title is required",
    }),
    instructor: z.string({
      invalid_type_error: "instructor must be a string",
      required_error: "instructor is required",
    }),
    categoryId: z.string({
      invalid_type_error: "categoryId must be a string",
      required_error: "categoryId is required",
    }),
    price: z.number({
      invalid_type_error: "price must be a number",
      required_error: "price is required",
    }),
    tags: z.array(tagSchemaValidation),
    startDate: z.string({
      invalid_type_error: "startDate must be a string",
      required_error: "startDate is required",
    }),
    endDate: z.string({
      invalid_type_error: "endDate must be a string",
      required_error: "endDate is required",
    }),
    language: z.string({
      invalid_type_error: "language must be a string",
      required_error: "language is required",
    }),
    provider: z.string({
      invalid_type_error: "provider must be a string",
      required_error: "provider is required",
    }),
    details: z.object({
      level: z.string({
        invalid_type_error: "level must be a string",
        required_error: "level is required",
      }),
      description: z.string({
        invalid_type_error: "description must be a string",
        required_error: "description is required",
      }),
    }),
  }),
});

const updateTagSchemaValidation = z.object({
  name: z
    .string({
      invalid_type_error: "name must be a string",
    })
    .optional(),
  isDeleted: z
    .boolean({
      invalid_type_error: "isDeleted must be a boolean",
    })
    .optional(),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: "title must be a string",
      })
      .optional(),
    instructor: z
      .string({
        invalid_type_error: "instructor must be a string",
      })
      .optional(),
    categoryId: z
      .string({
        invalid_type_error: "categoryId must be a string",
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: "price must be a number",
      })
      .optional(),
    tags: z.array(tagSchemaValidation).optional(),
    startDate: z
      .string({
        invalid_type_error: "startDate must be a string",
      })
      .optional(),
    endDate: z
      .string({
        invalid_type_error: "endDate must be a string",
      })
      .optional(),
    language: z
      .string({
        invalid_type_error: "language must be a string",
      })
      .optional(),
    provider: z
      .string({
        invalid_type_error: "provider must be a string",
      })
      .optional(),
    durationInWeeks: z.number().optional(),
    details: z
      .object({
        level: z
          .string({
            invalid_type_error: "level must be a string",
          })
          .optional(),
        description: z
          .string({
            invalid_type_error: "description must be a string",
          })
          .optional(),
      })
      .optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
