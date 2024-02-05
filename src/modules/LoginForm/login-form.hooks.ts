import { postFetch } from 'helpers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignInDto } from 'types';
import { useLoginFormStore } from './login-form.store';
import { LoginFormData } from './login-form.types';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const setParams = useLoginFormStore((state) => state.setParams);
  const {
    register,
    setError,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormData>();
  const onSubmit = handleSubmit(async (params) => {
    try {
      setLoading(true);
      const { send, authTokenExpire }: SignInDto = await postFetch(
        '/auth/sign-in',
        params,
      );

      if (send === 'auth-secret') {
        setParams(params);
        setLoading(false);
        window.localStorage.setItem(
          'auth-token-expire',
          authTokenExpire.toString(),
        );
        navigate('/auth-confirm');
        return;
      }

      setError('root', { message: 'Confirmation email not sent' });
    } catch (err: any) {
      if (err.type === 'wrong-sign-in-data') {
        setError('root', { message: 'Wrong username or password' });
      } else {
        setError('root', { message: 'Something went wrong' });
      }
    }
    setLoading(false);
  });

  return {
    errors,
    onSubmit,
    register,
    isLoading,
    hasError: Object.values(errors).length,
  };
};
