import { constants } from "../constants/constants.js";
import bcrypt, { hash } from "bcrypt";
import pkg from "jsonwebtoken";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

const { sign } = pkg;

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

// *** NEW AUTH ***

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return res.status(201).json({
      success: true,
      message: "The registration was successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  // This was passed down from the loginFieldsCheck function in Validators/authVal
  let user = req.user;

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };

  try {
    // Get JWT token
    const token = await sign(payload, constants.SECRET);
    console.log("SIGNIN RAN", token);

    // Pass cookie
    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const userData = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const response = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
