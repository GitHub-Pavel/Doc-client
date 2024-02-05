import { postFetch } from 'helpers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpDto } from 'types';
import { useSignUpFormStore } from './sign-up-form.store';
import { SignUpFormData } from './sign-up-form.types';

export const useSignUpForm = () => {
  const [isLoading, setLoading] = useState(false);
  const setParams = useSignUpFormStore((state) => state.setParams);
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const onSubmit = handleSubmit(async (params) => {
    try {
      setLoading(true);
      const { send }: SignUpDto = await postFetch('/auth/sign-up', params);
      if (send === 'activation-link') {
        setParams(params);
        setLoading(false);
        reset();
        return;
      }
      setError('root', { message: 'Confirmation email not sent' });
    } catch (err: any) {
      if (err.type === 'wrong-sign-in-data') {
        setError('root', { message: 'Invalid registration information' });
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
