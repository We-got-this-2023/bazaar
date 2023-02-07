import express from "express";
import { signIn, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", signIn);
router.post("/register", signUp);

export default router;
