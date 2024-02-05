import { postFetch } from 'helpers';
import { useLoginFormStore } from 'modules/LoginForm/login-form.store';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInDto } from 'types';

type RepeatQeuryReturnProps = [() => void, boolean] | [null, null];

export const useRepeatQuery = (
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void,
): RepeatQeuryReturnProps => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { formParams, setParams } = useLoginFormStore((state) => state);
  const clickHandler = async () => {
    setLoading(true);
    const { send, authTokenExpire }: SignInDto = await postFetch(
      '/auth/sign-in',
      formParams,
    );
    if (send === 'auth-secret') {
      setParams(null);
      window.localStorage.setItem(
        'auth-token-expire',
        authTokenExpire.toString(),
      );
    }
    setLoading(false);
    restart(new Date(authTokenExpire), true);
  };

  useLayoutEffect(() => {
    if (!formParams) {
      window.localStorage.removeItem('auth-token-expire');
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!formParams) return [null, null];
  return [clickHandler, isLoading];
};
