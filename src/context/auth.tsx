import { createContext } from 'react';
import { UserType } from '../types';

type AuthContextType = {
  user: UserType | null;
  login?: (data: UserType) => Promise<void>;
  logout?: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  // login: undefined,
  // logout: undefined,
});
