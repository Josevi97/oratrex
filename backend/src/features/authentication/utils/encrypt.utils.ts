import bcrypt from 'bcrypt';

const encryptUtils = () => {
  const encrypt = async (password: string) => await bcrypt.hash(password, 10);

  const compare = async (a: string, b: string) => await bcrypt.compare(a, b);

  return {
    encrypt,
    compare,
  }
}

export default encryptUtils();
