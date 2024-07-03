import usersRepository, { UsersRepository } from "../repositories/users.repository";

export type UsersService = {}

const makeUsersService = (repository: UsersRepository): UsersService => {
  return {}
}

export default makeUsersService(usersRepository);

export {
  makeUsersService,
}
