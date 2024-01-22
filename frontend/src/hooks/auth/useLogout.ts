import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useAuthContext } from '../../providers';
import { logoutApi } from '../../api/auth';

export const useLogout = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { setUser } = useAuthContext();
  const { trigger, isMutating } = useSWRMutation('/auth/logout', logoutApi);

  const clearAllCache = () =>
    mutate(() => true, undefined, { revalidate: false });

  const logout = async () => {
    try {
      await trigger();
      setUser(null);
      clearAllCache();
      navigate('/login');
    } catch (e) {
      toast({
        title: 'Error',
        description:
          e.response.data.message ||
          'Sorry, error has occurred. Try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    logout,
    isMutating,
  };
};
