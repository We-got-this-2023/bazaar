import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

//delete user password from response

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    user.password = undefined;

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: "Invalid password" });
    }

    user.password = undefined;

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
