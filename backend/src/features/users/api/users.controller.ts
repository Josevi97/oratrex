import usersService, { UsersService } from "../services/users.service";

export type UsersController = {
  bulk(): void;
}

const makeUsersController = (service: UsersService): UsersController => {
  const bulk = () => {
    console.log('works');
  }

  return {
    bulk
  }
}

export default makeUsersController(usersService);

export {
  makeUsersController,
}
