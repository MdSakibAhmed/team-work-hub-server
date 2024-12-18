import { Auth } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import exclude from "../../../utils/excludeField";
import { TAuth } from "./auth.interface";
import config from "../../config";
import { AppDataSource } from "../../../server";
const loginFromDB = async (payLoad: { email: string; password: string }) => {
  const authRepo = AppDataSource.getRepository(Auth);

  const { email, password: plainTextPass } = payLoad;
  const user = await authRepo.findOne({ where: { email } });

  if (!user) {
    throw new Error("user not found ");
  }

  // match password
  const isMatched = await bcrypt.compare(
    plainTextPass as string,
    user.password
  );
  if (!isMatched) {
    throw new Error("incorrect password ");
  }

  // genarate token for this user
  const payLoadForToken = {
    userId: user.id,
    email,
  };
  const token = jwt.sign(
    payLoadForToken,
    process.env.JWT_SECRET_KEY as string,
    { algorithm: "HS256", expiresIn: process.env.TOKEN_EXPIRES_TIME }
  );

  const userWithoutPass = exclude(user, ["password"]);
  return {
    userWithoutPass,
    token,
  };
};

const registerIntoDB = async (payLoad: TAuth) => {
  const authRepo = AppDataSource.getRepository(Auth);
  const hassedPassword = await bcrypt.hash(
    payLoad.password,
    Number(process.env.SALT_ROUNDS)
  );
  payLoad.password = hassedPassword;
  const user = await authRepo.save(payLoad);
  const payLoadForToken = {
    userId: user.id,
    email: user.email,
  };
  console.log(payLoadForToken);

  const token = jwt.sign(payLoadForToken, config.jwt_secret_key as string, {
    algorithm: "HS256",
    expiresIn: config.token_expires_time,
  });
  const userWithoutPass = exclude(user, ["password"]);
  return { userWithoutPass, token };
};

export const authServices = {
  loginFromDB,
  registerIntoDB,
};
