import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  token_expires_time: process.env.TOKEN_EXPIRES_TIME,
  db_host: process.env.DB_HOST,
  db_type: process.env.DB_TYPE,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  database_host: process.env.DATABASE_HOST,
  redis_url: process.env.REDIS_URL,
  redis_port: process.env.REDIS_PORT,
  redis_host: process.env.REDIS_HOST,
  redis_password: process.env.REDIS_PASS,
  redis_username: process.env.REDIS_USERNAME,
};
