import { AnyZodObject } from "zod";
import { RequestHandler } from "express";

const validateRequest = (zodSchme: AnyZodObject): RequestHandler => {
  return async (req, res, next) => {
    try {
      await zodSchme.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      console.log(error);
    }
  };
};

export default validateRequest;