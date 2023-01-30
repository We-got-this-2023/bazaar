import { Request, Response } from "express";
import prisma from "../prisma/prisma.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: "Products not found" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, userId } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        user: {
          connect: {
            id: Number(userId),
          },
        },
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, userId } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        user: {
          connect: {
            id: Number(userId),
          },
        },
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};
