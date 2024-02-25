import { useContext } from 'react';
import { AuthContext } from '.';

export function useAuthContext() {
  return useContext(AuthContext);
}
