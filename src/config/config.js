import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  private_key: process.env.PRIVATE_KEY,
  cookie_name: process.env.COOKIE_NAME,
};
