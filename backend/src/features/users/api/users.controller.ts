import { Response } from "express";
import usersService, { UsersService } from "../services/users.service";
import { CustomRequest } from "../../../types/requests";
import { UserDto } from "../types/user.dto";

export type UsersController = {
  getAll(re: CustomRequest<UserDto>, res: Response): void;
  bulkCreate(re: CustomRequest<UserDto>, res: Response): void;
}

const makeUsersController = (service: UsersService): UsersController => {
  const getAll = (req: CustomRequest<UserDto>, res: Response) => {
    service.getAll()
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Error getting data' });
      })

  }

  const bulkCreate = (req: CustomRequest<UserDto>, res: Response) => {
    if (!req.fileContent) {
      res.status(404).json({ error: 'Error, could not get the csv serialized data'});
      return;
    };

    service.bulkSave(req.fileContent).then((saved) => {
      if (saved) {
        res.status(201);
      } else {
        res.status(400).json({ error: 'Could not load data'});
      }

      res.end();
    }).catch((error) => {
      res.status(500).json({ error: 'Internal error'});
      res.end();
    });
  }

  return {
    getAll,
    bulkCreate,
  }
}

export default makeUsersController(usersService);

export {
  makeUsersController,
}
