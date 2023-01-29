import { Request, Response } from "express";
import prisma from "../prisma/prisma.js";

const getUsers = async (req: Request, res: Response) => {
  res.send("getUsers");
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.json(user);
};

const deleteUser = async (req: Request, res: Response) => {
  res.send("deleteUser");
};

const updateUser = async (req: Request, res: Response) => {
  res.send("updateUser");
};

export { getUsers, getUser, createUser, deleteUser, updateUser };
