import { useState, useCallback } from 'react';
import { UserType } from '../../types';
import { getUserApi } from '../../api/auth';

export const useAuth = () => {
  // return useContext(AuthContext);
  const [user, setUser] = useState<UserType | null>(null);

  const getUser = useCallback(async () => {
    try {
      const res = await getUserApi('/auth/user');
      console.log('rest', res);
      setUser({
        id: res.id,
        email: res.email,
      });
    } catch {
      setUser(null);
    }
  }, []);

  return {
    user,
    setUser,
    getUser,
  };
};
