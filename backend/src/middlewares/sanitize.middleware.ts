import sanitize from '../../src/shared/sanitize';
import { NextFunction, Request, Response } from "express"

const sanitizeMiddleware = (key: string) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const t = (req as any)[key]
    if (!t) return;

    (req as any)[key] = sanitize.fromUnknown(t);

    next();
  }
}

export default sanitizeMiddleware;
