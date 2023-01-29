import { Request, Response } from "express";
import prisma from "../prisma/prisma.js";

async function getProducts(req: Request, res: Response) {
  res.send("getProducts");
}

async function getProduct(req: Request, res: Response) {
  res.send("getProduct");
}

async function createProduct(req: Request, res: Response) {
  res.send("createProduct");
}

async function deleteProduct(req: Request, res: Response) {
  res.send("deleteProduct");
}

async function updateProduct(req: Request, res: Response) {
  res.send("updateProduct");
}

export { getProducts, getProduct, createProduct, deleteProduct, updateProduct };
