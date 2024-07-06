import useApiGet from '../../../core/api/hooks/useApiGet';
import { User } from '../../users/types/user';

const useApiSession = () => {
  return useApiGet<User>(['auth', 'session']);
};

export default useApiSession;
