import { config } from "dotenv";
config();

export const constants = {
  SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
};
