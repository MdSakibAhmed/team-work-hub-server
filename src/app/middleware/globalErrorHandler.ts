import { ErrorRequestHandler } from "express";
import { TErrorResponse } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  const errorResponse: TErrorResponse = {
    success: false,
    message: err.message || "something went wrong",
    errorMessage: "",
    errorDetails: "",
    stack: "",
  };

  res.send(errorResponse);
};

export default globalErrorHandler;
