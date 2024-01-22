import { useState, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { useToast } from '@chakra-ui/react';
import { useAuthContext } from '../../providers';
import { loginApi } from '../../api/auth';
import { isErrorWithMessage } from '../../utils';

export const useLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [errorMessages, setErrorMessages] = useState<
    { message: string; label: string }[]
  >([]);
  const { setUser } = useAuthContext();
  const { trigger, isMutating } = useSWRMutation('/auth/login', loginApi);

  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    const form = new FormData(e.currentTarget);
    const inputEmail = form.get('email')?.toString() || '';
    const inputPassword = form.get('password')?.toString() || '';

    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailPattern.test(inputEmail)) {
      if (!emailPattern.test(inputEmail)) {
        const emailError = {
          message: 'Enter a valid email address',
          label: 'email',
        };
        setErrorMessages((currentItem) => [...currentItem, emailError]);
      }

      if (!inputPassword) {
        const passwordError = {
          message: 'Password is required',
          label: 'password',
        };
        setErrorMessages((currentItem) => [...currentItem, passwordError]);
      }
      return;
    }

    try {
      const res = await trigger({ email: inputEmail, password: inputPassword });
      setUser({ id: res.id, email: res.email });
      navigate('/');
    } catch (e) {
      if (isErrorWithMessage(e)) {
        toast({
          title: 'Error',
          description:
            e.response?.data.message ||
            'Sorry, error has occurred. Try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return {
    login,
    errorMessages,
    isMutating,
  };
};
