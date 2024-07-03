import UserEntity from "../entities/user.entity";

export type UsersRepository = {

}

const makeUsersRepository = (entity: UserEntity): UsersRepository => {
  return {
  };
}

export default makeUsersRepository(new UserEntity());

export {
  makeUsersRepository,
}
