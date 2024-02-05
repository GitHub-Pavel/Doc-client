import { postFetch } from 'helpers';
import { MutableRefObject, useEffect, useState } from 'react';
import { useIMask } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store';
import { UserDto } from 'types';
import { useHomeLogoStore } from '../HomeLogo/home-logo.store';

export const useConfirmInput = () => {
  const [userDto, setUserDto] = useState<UserDto>({ user: null });
  const { isHide, toggleShow, isAnimationEnd } = useHomeLogoStore(
    (state) => state,
  );
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const { ref } = useIMask(
    {
      lazy: false,
      mask: '*****',
      overwrite: 'shift',
    },
    {
      onComplete: async (secret) => {
        const userDto: UserDto = await postFetch('/auth/confirm', { secret });
        if (userDto.user) {
          setUserDto(userDto);
          toggleShow();
        }
      },
    },
  );

  useEffect(() => {
    if (isHide && !isAnimationEnd) {
      window.localStorage.removeItem('auth-token-expire');
      setUser(userDto.user);
      navigate('/');
      toggleShow();
    }
  }, [isHide, isAnimationEnd, navigate, userDto.user, setUser, toggleShow]);

  return ref as MutableRefObject<HTMLInputElement>;
};
