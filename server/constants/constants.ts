import { config } from "dotenv";
config();

export const constants = {
  SECRET: process.env.JWT_SECRET,
};
