import usersService, { UsersService } from './../../users/services/users.service';
import { NextFunction, Response } from "express"
import { SessionRequest } from "../../../types/requests"
import authUtils from '../utils/auth.utils';

const authKey = 'Bearer ';

const authMiddleware = (usersService: UsersService) => {
  return async (req: SessionRequest, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'];
    if (!auth || !auth.includes(authKey)) {
      res.status(401)
      res.end();

      return;
    }

    const token = auth.split(authKey)[1];
    const payload = authUtils.decode(token);

    if (!payload) {
      res.status(401).json({ error: 'Invalid access token'});
      res.end();

      return;
    }

    const user = await usersService.getById(payload.id);
    if (!user) {
      res.status(401).json({ error: `Invalid session with token: ${token}`});
      res.end();

      return;
    }

    console.log('Session allowed');
    req.session = user;

    next();
  }
}

export default authMiddleware(usersService);
