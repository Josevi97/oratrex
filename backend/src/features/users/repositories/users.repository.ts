import { UserFields } from "../constants/user.fields";
import UserEntity from "../entities/user.entity";
import { UserDto } from "../types/user.dto";

// TODO: This is hard coupled to Sequalize
export type UsersRepository = {
  getAll(): Promise<any>;
  bulkSave(users: UserDto[]): Promise<boolean>;
}

const makeUsersRepository = (): UsersRepository => {
  // This is only being used for testing
  const getAll = async () => {
    return UserEntity.findAll({
      attributes: { exclude: [UserFields.password] }
    });
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

  return {
    getAll,
    bulkSave,
  };
}

export default makeUsersRepository();

export {
  makeUsersRepository,
}
