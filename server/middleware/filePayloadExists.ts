import { Request, Response, NextFunction } from "express";

export const filesPayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files)
    return res.status(400).json({ status: "error", message: "Missing files" });

  next();
};
