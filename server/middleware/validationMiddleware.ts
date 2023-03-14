import { validationResult } from "express-validator";

export const validationMiddleware = (req, res, next) => {
  // This will equal to the validation result from validators/authVal.ts and contain the errors

  let errors = validationResult(req);

  //   If there was an error then it will not be empty and this will return a json response of the error as an array

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};
