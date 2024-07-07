import { Request, Response } from "express";
import usersService, { UsersService } from "../services/users.service";
import { CustomRequest } from "../../../types/requests";
import { UserDto } from "../types/user.dto";
import sanitize from "@src/shared/sanitize";

export type UsersController = {
  getAll(req: Request, res: Response): void;
  bulkCreate(req: CustomRequest<UserDto>, res: Response): void;
  deleteAll(req: Request, res: Response): void;
}

const makeUsersController = (service: UsersService): UsersController => {
  const getAll = async (_: CustomRequest<UserDto>, res: Response) => {
    const data = await service.getAll()

    res
      .status(200)
      .json({ data: data })
      .end();
  }

  const bulkCreate = async (req: CustomRequest<UserDto>, res: Response) => {
    const created = await service.bulkSave(req.fileContent!)

    if (created) {
      res.status(201);
    } else {
      res.status(400).json({ error: 'Could not load data'});
    }

    res.end();
  }

  const deleteAll = async (_: Request, res: Response) => {
    await service.deleteAll()

    res.status(201);
    res.end();
  }

  return {
    getAll,
    bulkCreate,
    deleteAll,
  }
}

export default makeUsersController(usersService);

export {
  makeUsersController,
}
