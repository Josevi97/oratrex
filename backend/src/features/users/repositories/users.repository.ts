import { UserFields } from "../constants/user.fields";
import UserEntity from "../entities/user.entity";
import { UserDto } from "../types/user.dto";

// TODO: This is hard coupled to Sequalize
export type UsersRepository = {
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  getByUsername(username: string): Promise<any>;
  bulkSave(users: UserDto[]): Promise<boolean>;
  deleteAll(): Promise<void>;
}

const makeUsersRepository = (): UsersRepository => {
  // This is only being used for testing
  const getAll = async () => {
    return UserEntity.findAll({
      attributes: { exclude: [] }
    });
  }

  const getById = async (id: string) => {
    return UserEntity.findOne({
      where: { id },
      attributes: { exclude: [UserFields.password] },
    })
      .then(row => row)
      .catch(_ => null);
  }

  const getByUsername = async (username: string) => {
    return UserEntity.findOne({
      where: { username },
    })
      .then(row => row)
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
