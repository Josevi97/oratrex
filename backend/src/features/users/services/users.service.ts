import bcrypt from 'bcrypt';

import usersRepository, { UsersRepository } from "../repositories/users.repository";
import { UserDto } from "../types/user.dto";

export type UsersService = {
  getAll(): Promise<any>;
  bulkSave(users: UserDto[]): Promise<boolean>;
}

const makeUsersService = (repository: UsersRepository): UsersService => {
  const getAll = async () => {
    return repository.getAll();
  }

  const bulkSave = async (users: UserDto[]) => {
    const encryptedUsers = await Promise.all(users.map(async user => {
      return {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }
    }));

    return repository.bulkSave(encryptedUsers);
  }

  return {
    getAll,
    bulkSave,
  }
}

export default makeUsersService(usersRepository);

export {
  makeUsersService,
}
