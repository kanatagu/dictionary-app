import { useState, FormEventHandler } from 'react';
import { useCheckUserPool } from '../hooks';
import { useAuth } from '../../../hooks';

export const useSignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useAuth();
  const { isUserInPool, addUserToPool } = useCheckUserPool();

  const signUp: FormEventHandler<HTMLFormElement> = (e) => {
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

    if (isUserInPool(inputEmail)) {
      setErrorMessage('Email already exists');
      return;
    }

    addUserToPool(inputEmail);
    setUser({ id: '1', email: inputEmail });
  };

  return {
    errorMessage,
    signUp,
  };
};
