import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const authValidator = [
  body('username', 'Invalid username. Field cannot be empty').not().isEmpty(),
  body('password', 'Invalid password. Field cannot be empty').not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    next();
  }
];

export default authValidator;
