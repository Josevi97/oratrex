import usersService from '@src/features/users/services/users.service';
import { UserDto } from '@src/features/users/types/user.dto';

const validData: UserDto[] = [
  {
    address: "address",
    name: 'name',
    username: 'username',
    password: 'password',
    code: 'code',
  }
];

// TODO: Looks like bcrypt is doing its stuff. I tried to mock it but looks
// like this is not working correctly
// jest.mock('@src/features/authentication/utils/encrypt.utils', () => ({
//   encryptUtils: {
//     encrypt: jest.fn().mockReturnValue(Math.random().toString()),
//   }
// }));

describe('Bulk create users', () => {
  it('Should encrypt passwords', async () => {
    const result = await usersService.encryptUsers(validData);

    expect(result.length).toBe(validData.length);
    expect(result.map(user => user.password)).not.toEqual(validData.map(user => user.password));
  });
});
