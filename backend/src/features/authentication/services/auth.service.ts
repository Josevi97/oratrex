import { AuthDto } from '../types/auth.dto';
import authenticationUtils from '../utils/auth.utils';
import usersService, { UsersService } from './../../users/services/users.service';

export type AuthService = {
  login(credentials: AuthDto): Promise<any>;
  session(): Promise<any>;
}

const makeAuthService = (usersService: UsersService): AuthService => {
  const login = async (credentials: AuthDto) => {
    const { username, password } = credentials;
    const user = await usersService.getByUsernameAndPassword(username, password);

    if (!user) return null;

    const date = new Date();
    const access_token = authenticationUtils.sign(user.id);

    return {
      access_token,
      expires_at: date,
    }
  }

  const session = async () => {

  }

  return {
    login,
    session,
  }
}

export default makeAuthService(usersService);;

export {
  makeAuthService,
}
