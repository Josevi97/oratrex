import { UserFields } from "../constants/user.fields";
import UserEntity from "../entities/user.entity";
import { User } from "../types/user";
import { UserDto } from "../types/user.dto";

export type UsersRepository = {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByUsername(username: string): Promise<User | null>;

  bulkSave(users: UserDto[]): Promise<boolean>;
  deleteAll(): Promise<void>;
}

const makeUsersRepository = (): UsersRepository => {
  // This is only being used for testing
  const getAll = async (): Promise<User[]> => {
    return UserEntity.findAll({
      attributes: { exclude: [UserFields.password] }
    })
      .then(rows => {
        return rows.map(row => row.get({ plain: true })) ?? [];
      })
      .catch(_ => []);
  }

  const getById = async (id: string): Promise<User | null> => {
    return UserEntity.findOne({
      where: { id },
      attributes: { exclude: [UserFields.password] },
    })
      .then(row => row?.get({ plain: true }) ?? null)
      .catch(_ => null);
  }

  const getByUsername = async (username: string): Promise<User | null> => {
    return UserEntity.findOne({
      where: { username },
    })
      .then(row => row?.get({ plain: true}) ?? null)
      .catch(_ => null);
  }

  const bulkSave = async (users: UserDto[]) => {
    return new Promise<boolean>((resolve, _) => {
      UserEntity.bulkCreate(users, {
        ignoreDuplicates: true,
        fields: [
          UserFields.name,
          UserFields.address,
          UserFields.username,
          UserFields.password,
          UserFields.code
        ]},
      )
        .then(() => resolve(true))
        .catch(() => resolve(false))
    });
  }

  // This is only being used for testing
  const deleteAll = async () => {
    UserEntity.truncate();
  }

  return {
    getAll,
    getById,
    getByUsername,
    bulkSave,
    deleteAll,
  };
}

export default makeUsersRepository();

export {
  makeUsersRepository,
}
