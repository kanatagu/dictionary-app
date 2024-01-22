import { createContext, Dispatch, SetStateAction, useEffect } from 'react';
import { useAuth } from '../hooks/auth';
import { UserType } from '../types';

type AuthContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, setUser, getUser } = useAuth();

  // Check if user has token when app loads/reloads
  useEffect(() => {
    getUser();
  }, [getUser]);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
