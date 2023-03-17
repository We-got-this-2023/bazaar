import { validationMiddleware } from "./middleware/validationMiddleware.js";
import { register } from "./controllers/authController.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";
import { filesPayloadExists } from "./middleware/filePayloadExists.js";
import { fileExtLimiter } from "./middleware/fileExtLimiter.js";
import { fileSizeLimiter } from "./middleware/fileSizeLimiter.js";
import { valCheck } from "./validators/authVal.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { constants } from "./constants/constants.js";
dotenv.config();

// const { cookieParser } = pkg;

const app = express();
const port = 3000;
app.use(express.json());

app.use(cookieParser());
app.use(cors({ origin: constants.CLIENT_URL, credentials: true }));
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/test", (req, res) => {
  res.send("Hello, test");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files.files as UploadedFile;
    console.log(files);

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "files", files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });

    return res.json({
      status: "success",
      message: Object.keys(files).toString(),
    });
  }
);

// TODO set up the user and products routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
