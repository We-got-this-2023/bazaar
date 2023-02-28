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
  const {
    q,
    p,
    clo,
    chi,
    s,
    o,
    t,
    rlo,
    rhi,
    stags,
    tags,
    notags,
  }: {
    q?: string;
    p?: string;
    clo?: string;
    chi?: string;
    s?: string;
    o?: string;
    t?: string;
    rlo?: string;
    rhi?: string;
    stags?: string;
    tags?: string;
    notags?: string;
  } = req.query;
  console.log("?????????????????");

  const query = q,
    page = Number(p || 1),
    costLow = Number(clo || 0),
    costHigh = Number(chi || 999999999),
    sortBy = s || "createdAt",
    order = o || "asc",
    timeSince = t || 999999999,
    ratingLow = Number(rlo || 0),
    ratingHigh = Number(rhi || 999999999),
    someTags = stags ? stags.split(",") : undefined,
    allTags = tags ? tags.split(",") : [],
    notAnyTags = notags ? notags.split(",") : [];

  console.log(ratingLow, ratingHigh, costLow, costHigh, timeSince);
  try {
    const products = await prisma.product.findMany({
      skip: page - 1,
      take: 10,
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { tags: { has: query } },
        ],
        price: {
          gte: costLow,
          lte: costHigh,
        },
        rating: {
          gte: ratingLow,
          lte: ratingHigh,
        },
        createdAt: {
          gte: new Date(timeSince),
        },
        tags: {
          hasEvery: allTags,
          hasSome: someTags,
        },
        NOT: {
          tags: {
            hasSome: notAnyTags,
          },
        },
      },
      orderBy: {
        [sortBy]: order,
      },
    });
    console.log(products);
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
    res.status(404).json({ message: "Couldn't create product" });
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
