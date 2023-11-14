import { useState, FormEventHandler } from 'react';
import { useCheckUserPool } from '../hooks';
import { useAuth } from '../../../hooks';

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { isUserInPool } = useCheckUserPool();
  const { setUser } = useAuth();

  const login: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const form = new FormData(e.currentTarget);
    const inputEmail = form.get('email')?.toString() || '';

    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailPattern.test(inputEmail)) {
      setErrorMessage('Enter a valid email address');
      return;
    }

    if (!isUserInPool(inputEmail)) {
      setErrorMessage('Email address is not registered');
      return;
    }

    setUser({ id: '1', email: inputEmail });
  };

  return {
    login,
    errorMessage,
  };
};
