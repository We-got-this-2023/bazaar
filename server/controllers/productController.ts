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
    atags,
    ntags,
    id,
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
    atags?: string;
    ntags?: string;
    id?: number;
  } = req.query;

  const query = q ?? "",
    page = Number(p ?? 1),
    costLow = Number(clo ?? 0),
    costHigh = Number(chi ?? 999999999),
    sortBy = s ?? "createdAt",
    order = o ?? "asc",
    timeSince = t || 999999999,
    ratingLow = Number(rlo ?? 0),
    ratingHigh = Number(rhi ?? 999999999),
    someTags = stags ? stags.split(",") : undefined,
    allTags = atags ? atags.split(",") : [],
    notAnyTags = ntags ? ntags.split(",") : [];

  try {
    const products = await prisma.product.findMany({
      skip: page - 1,
      take: 10,
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              { tags: { has: query } },
            ],
          },
          {
            OR: [
              { rating: { gte: ratingLow, lte: ratingHigh } },
              { rating: null },
              { rating: undefined },
            ],
          },
        ],
        NOT: {
          tags: {
            hasSome: notAnyTags,
          },
        },
        price: {
          gte: costLow,
          lte: costHigh,
        },
        createdAt: {
          gte: new Date(timeSince),
        },
        tags: {
          hasEvery: allTags,
          hasSome: someTags,
        },
        userId: id
          ? {
              equals: id,
            }
          : {},
      },
      orderBy: {
        [sortBy]: order,
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
    let { title, price, userId, shippingMethodId, rating, description } =
      req.body;
    console.log(req.body);

    title = title ? title : "";
    price = price ? price : 0;
    rating = rating ? rating : 0;
    description = description ? description : "";
    shippingMethodId = shippingMethodId ? shippingMethodId : 1;

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
        rating: Number(rating),
        description,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
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

export const getProductsPagination = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const products = await prisma.product.findMany({
      skip: Number(id) - 1,
      take: 1, // need to increase this to 10 for production
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: "Products not found" });
  }
};
