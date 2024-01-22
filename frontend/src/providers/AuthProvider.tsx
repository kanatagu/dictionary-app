import { createContext } from 'react';
import { useLocalStorage, SetValue } from '../hooks/common';
import { UserType } from '../types';

type AuthContextType = {
  user: UserType | null;
  setUser: SetValue<UserType | null>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<UserType | null>('user', null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
