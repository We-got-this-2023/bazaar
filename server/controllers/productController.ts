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

export const getProductsWithParams = async (req: Request, res: Response) => {
  let query,
    page,
    priceMin,
    priceMax,
    sortBy,
    sortDir,
    time,
    ratingMin,
    ratingMax,
    tags,
    blacklistTags;

  try {
    const products = await prisma.product.findMany({
      skip: page ? page - 1 : 0,
      take: 10,
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
        price: {
          gte: priceMin ?? 0,
          lte: priceMax ?? Infinity,
        },
        rating: {
          gte: ratingMin ?? 0,
          lte: ratingMax ?? 5,
        },
        createdAt: {
          gte: time ? new Date(time) : null,
        },
        tags: {
          has: tags ?? [],
        },
        NOT: {
          tags: {
            has: blacklistTags,
          },
        },
      },
      orderBy: {
        [(sortBy || "createdAt") as string]: (sortDir || "asc") as
          | "asc"
          | "desc",
      },
    });
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

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productsDetails = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        userRelation: true,
      },
    });
    res.status(200).json(productsDetails);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.params;
    const { title, price, userId, shippingMethodId } = req.body;
    const product = await prisma.product.create({
      data: {
        title,
        price: Number(price),
        shippingMethodRelation: {
          connect: {
            id: Number(shippingMethodId),
          },
        },
        userRelation: {
          connect: {
            id: Number(userId),
          },
        },
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Couldnt create product" });
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
    const { title, price, userId } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title,
        price,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};
