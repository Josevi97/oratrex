import bcrypt from 'bcrypt';

import usersRepository, { UsersRepository } from "../repositories/users.repository";
import { UserDto } from "../types/user.dto";

export type UsersService = {
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any>;
  getByUsernameAndPassword(username: string, password: string): Promise<any>
  bulkSave(users: UserDto[]): Promise<boolean>;
  deleteAll(): Promise<void>;
}

const makeUsersService = (repository: UsersRepository): UsersService => {
  const getAll = async () => {
    return repository.getAll();
  }

  const getById = async (id: string) => {
    return repository.getById(id);
  }

  const getByUsernameAndPassword = async (username: string, password: string) => {
    const user = await repository.getByUsername(username);
    const match = !!(await bcrypt.compare(password, user.password));

    return match ? user : null;
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

  const deleteAll = async () => {
    repository.deleteAll();
  }

  return {
    getAll,
    getById,
    getByUsernameAndPassword,
    bulkSave,
    deleteAll,
  }
}

export default makeUsersService(usersRepository);

export {
  makeUsersService,
}
