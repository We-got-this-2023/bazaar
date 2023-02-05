import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// "/" refers to "/products"
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.patch("/:id", verifyToken, updateProduct);

export default router;
