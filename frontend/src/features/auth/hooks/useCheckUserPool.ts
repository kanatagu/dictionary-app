import { useLocalStorage } from '../../../hooks/common';
import { UserType } from '../../../types';

export const useCheckUserPool = () => {
  const [storedUsers, setStoredUsers] = useLocalStorage<UserType[]>(
    'users',
    []
  );

  const isUserInPool = (inputEmail: string) => {
    return storedUsers.some((user) => user.email === inputEmail);
  };

  const addUserToPool = (inputEmail: string) => {
    const user = {
      email: inputEmail,
      id: (storedUsers.length + 1).toString(),
    };
    setStoredUsers([...storedUsers, user]);
  };

  return { isUserInPool, addUserToPool };
};
