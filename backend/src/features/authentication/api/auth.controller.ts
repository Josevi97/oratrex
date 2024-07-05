import { SessionRequest } from '../../../types/requests';
import authService, { AuthService } from './../services/auth.service';
import { Request, Response } from "express";

type AuthController = {
  login(req: Request, res: Response): void;
  session(req: Request, res: Response): void;
}

const makeAuthController = (service: AuthService): AuthController => {
  const login = (req: Request, res: Response) => {
    service.login(req.body)
      .then((data) => {
        if (data) {
          res.status(200).json({ data })
        } else {
          res.status(401).json({ error: 'Could not find any user with those credentials'});
        }

        res.end();
      })
      .catch(_ => {
        res.status(500).json({ error: 'Internal error, something weird happened'});
        res.end();
      });
  }

  const session = (req: SessionRequest, res: Response) => {
    res.status(200).json({ data: req.session });
    res.end();
  }

  return {
    login,
    session,
  }
}

export default makeAuthController(authService);

export {
  makeAuthController,
}