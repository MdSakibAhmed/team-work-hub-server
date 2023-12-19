import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "category name mus be a string ",
      required_error: "name is required",
    }),
  }),
});

export const CategoriesValidations = {
  createCategoryValidationSchema,
};
