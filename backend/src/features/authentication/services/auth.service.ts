import { Auth } from '../types/auth';
import { AuthDto } from '../types/auth.dto';
import authenticationUtils from '../utils/auth.utils';
import usersService, { UsersService } from './../../users/services/users.service';

export type AuthService = {
  login(credentials: AuthDto): Promise<Auth | null>;
}

const makeAuthService = (usersService: UsersService): AuthService => {
  const login = async (credentials: AuthDto): Promise<Auth | null> => {
    const { username, password } = credentials;
    const user = await usersService.getByUsernameAndPassword(username, password);

    if (!user) return null;

    const date = new Date();
    const accessToken = authenticationUtils.sign(user.id);

    return {
      accessToken,
      expiresAt: date,
    }
  }

  return {
    login,
  }
}

export default makeAuthService(usersService);;

export {
  makeAuthService,
}
