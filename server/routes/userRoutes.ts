import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// "/" refers to "/users"
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/:id", verifyToken, deleteUser);
router.patch("/:id", verifyToken, updateUser);

export default router;
