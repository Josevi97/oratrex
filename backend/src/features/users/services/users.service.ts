import QRCode from 'qrcode';

import usersRepository, { UsersRepository } from "../repositories/users.repository";
import { UserDto } from "../types/user.dto";
import { User } from '../types/user';
import encryptUtils from '../../../../src/features/authentication/utils/encrypt.utils';

export type UsersService = {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByUsernameAndPassword(username: string, password: string): Promise<User | null>

  encryptUsers(users: UserDto[]): Promise<UserDto[]>;
  bulkSave(users: UserDto[]): Promise<boolean>;
  deleteAll(): Promise<void>;
}

const makeUsersService = (repository: UsersRepository): UsersService => {
  const getAll = async (): Promise<User[]> => {
    return repository.getAll();
  }

  const getById = async (id: string): Promise<User | null> => {
    const user = await repository.getById(id);
    if (!user) return null;

    const qr = await QRCode.toDataURL(user.code);
    return { ...user, qr };
  }

  const getByUsernameAndPassword = async (username: string, password: string): Promise<User | null> => {
    const user = await repository.getByUsername(username);
    if (!user) return null;

   return !!(await encryptUtils.compare(password, user.password)) ? user : null;
  }

  const encryptUsers = async (users: UserDto[]) => {
    return await Promise.all(users.map(async user => {
      return {
        ...user,
        password: await encryptUtils.encrypt(user.password),
      }
    }));
  }

  const bulkSave = async (users: UserDto[]) => {
    return repository.bulkSave(await encryptUsers(users));
  }

  const deleteAll = async () => {
    repository.deleteAll();
  }

  return {
    getAll,
    getById,
    getByUsernameAndPassword,
    encryptUsers,
    bulkSave,
    deleteAll,
  }
}

export default makeUsersService(usersRepository);

export {
  makeUsersService,
}
