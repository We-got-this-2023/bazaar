import { constants } from "../constants/constants.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { valCheck } from "../validators/authVal.js";
import express from "express";
import {
  signIn,
  signUp,
  register,
  login,
  userData,
} from "../controllers/authController.js";

// const { cookieParser } = pkg;
const router = express.Router();

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors({ origin: constants.CLIENT_URL, credentials: true }));

router.post("/login", valCheck.loginValidation, validationMiddleware, login);
router.post(
  "/register",
  valCheck.registerValidation,
  validationMiddleware,
  register
);
router.get("/:userEmail", userData);

export default router;
