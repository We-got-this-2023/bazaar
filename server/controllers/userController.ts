import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  res.send("getUsers");
};

const getUser = async (req, res) => {
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

const deleteUser = async (req, res) => {
  res.send("deleteUser");
};

const updateUser = async (req, res) => {
  res.send("updateUser");
};

export { getUsers, getUser, createUser, deleteUser, updateUser };
