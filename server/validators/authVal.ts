import { check } from "express-validator";
import prisma from "../prisma/prisma.js";
import { compare } from "bcrypt";

const password = check("password")
  .isLength({ min: 6, max: 25 })
  .withMessage("Password has to be between 6-25 characters");

const email = check("email")
  .isEmail()
  .withMessage("Please provide a valid email");

// Check to see if email exists
const emailExists = check("email").custom(async (value) => {
  console.log(value);
  const email = await prisma.user.findUnique({
    where: {
      email: value,
    },
  });

  if (email) {
    throw new Error("Email already exists");
  }
});

const loginFieldsCheck = check("email").custom(async (value, { req }) => {
  console.log(value);

  const user = await prisma.user.findUnique({
    where: {
      email: value,
    },
  });

  if (!user) {
    throw new Error("Email does not exist");
  }

  const validPassword = await compare(req.body.password, user.password);

  if (!validPassword) {
    throw new Error("Wrong password");
  }

  // This is adding the user row (from the db) to the req
  req.user = user;
});

export const valCheck = {
  registerValidation: [email, password, emailExists],
  loginValidation: [loginFieldsCheck],
};
