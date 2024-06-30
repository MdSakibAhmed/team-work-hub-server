import { Auth } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import exclude from "../../../utils/excludeField";
import { TAuth } from "./auth.interface";
import config from "../../config";
const loginFromDB = async (payLoad: { email: string; password: string }) => {
  const { email, password: plainTextPass } = payLoad;
  const user = await Auth.findOne({ email });

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
  console.log(payLoad);
  const hassedPassword = await bcrypt.hash(
    payLoad.password,
    Number(process.env.SALT_ROUNDS)
  );
  payLoad.password = hassedPassword;
  const user = await Auth.create(payLoad);
  const payLoadForToken = {
    userId: user._id,
    email: user.email,
  };
  console.log(payLoadForToken);

  const token = jwt.sign(payLoadForToken, config.jwt_secret_key as string, {
    algorithm: "HS256",
    expiresIn: process.env.TOKEN_EXPIRES_TIME,
  });
  const userWithoutPass = exclude(user, ["password"]);
  return { userWithoutPass, token };
};

export const authServices = {
  loginFromDB,
  registerIntoDB,
};
