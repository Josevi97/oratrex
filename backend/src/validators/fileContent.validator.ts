import { NextFunction, Request, Response } from "express";
import { header, validationResult } from "express-validator";

const validateContentType = [
  header('Content-Type')
    .exists()
    .withMessage('Content-Type header is missing')
    .custom((value: string) => {
      if (!value.includes('multipart/form-data')) {
        throw new Error('Content-Type must be multipart/form-data');
      }

      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];

export default validateContentType;
