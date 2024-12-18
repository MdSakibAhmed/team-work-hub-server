import catchAsync from "../../utiles/catchAsync";
import httpStatus from "http-status";
import { authServices } from "./auth.service";
const login = catchAsync(async (req, res, next) => {
  const { token, userWithoutPass } = await authServices.loginFromDB(req.body);
  const data = {
    token,
    ...userWithoutPass,
  };
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "user logged in  successfully",
    data,
  });
});

const register = catchAsync(async (req, res, next) => {
  const newUser = req.body;
  const { token, userWithoutPass } = await authServices.registerIntoDB(newUser);
  const data = {
    token,
    ...userWithoutPass,
  };
  res.send({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "user registered successfully",
    data,
  });
});

export const authControllers = {
  login,
  register,
};
