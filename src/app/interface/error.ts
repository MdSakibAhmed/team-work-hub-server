export type TErrorResponse = {
  success: boolean;
  message: string;
  errorMessage: string;
  errorDetails: object;
  stack: string | undefined;
};
