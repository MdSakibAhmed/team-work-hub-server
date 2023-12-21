import { ErrorRequestHandler } from "express";
import { TErrorResponse } from "../interface/error";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorResponse: TErrorResponse = {
    success: false,
    message: err.message || "something went wrong",
    errorMessage: "",
    errorDetails: err,
    stack: err.stack || "",
  };
  if (err instanceof ZodError) {
    errorResponse.message = "Validation Error";
    errorResponse.errorDetails = err;
    errorResponse.errorMessage = err.issues
      .map((issue) => issue.message)
      .join(". ");
    errorResponse.stack = err.stack;
  } else if (err.name == "CastError") {
    errorResponse.message = "Invalid ID";
    errorResponse.errorMessage = `${err.value} is not a valid ID!`;
    errorResponse.errorDetails = err;
    errorResponse.stack = err.stack;
  } else if (err.code == 11000) {
    const match = err.message.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];
    errorResponse.message = "Duplicate Entry";
    errorResponse.errorMessage = `${extractedMessage} is already exist`;
    errorResponse.errorDetails = err;
    errorResponse.stack = err.stack;
  }

  res.status(400).json(errorResponse);
};

export default globalErrorHandler;
