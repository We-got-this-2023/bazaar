import express from "express";
import { getCart } from "../controllers/cartController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// "/" refers to "/products"
router.post("/");
router.delete("/:id", verifyToken);
router.patch("/:id", verifyToken);
router.get("/:id", getCart);

export default router;
