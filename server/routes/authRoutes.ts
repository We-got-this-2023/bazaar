import express from "express";
import { signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", signUp);

export default router;
