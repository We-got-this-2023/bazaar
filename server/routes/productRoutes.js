import express from "express";

const router = express.Router();

// ----------------------------------------
// Functions to prevent errors until the controllers are created
let getProducts, getProduct, createProduct, deleteProduct, updateProduct;
getProducts =
  getProduct =
  createProduct =
  deleteProduct =
  updateProduct =
    () => {};
// ----------------------------------------

// "/" refers to "/products"
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);

export default router;
