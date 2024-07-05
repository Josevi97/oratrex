import { PRIVATE_KEY } from '../../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authenticationUtils = () => {
  const sign = (id: string) => {
    const date = new Date();
    return jwt.sign({ id: id, date }, PRIVATE_KEY, { expiresIn: '15d'});
  }

  const decode = (token: string) => {
    return jwt.verify(token, PRIVATE_KEY) as JwtPayload;
  }

  return {
    sign,
    decode,
  }
}

export default authenticationUtils();
