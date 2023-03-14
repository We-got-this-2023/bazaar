import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { valCheck } from "../validators/authVal.js";
import express from "express";
import {
  signIn,
  signUp,
  register,
  login,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", valCheck.loginValidation, validationMiddleware, login);
router.post(
  "/register",
  valCheck.registerValidation,
  validationMiddleware,
  register
);

export default router;
