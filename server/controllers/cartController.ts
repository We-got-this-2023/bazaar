import prisma from "../prisma/prisma.js";
import { Request, Response } from "express";

export const getCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart = await prisma.shoppingCart.findUnique({
      where: { id: Number(id) },
      include: {
        cartProductRelation: true,
      },
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: "Cart not found" });
  }
};
