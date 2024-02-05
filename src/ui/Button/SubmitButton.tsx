'use client';

import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react';
import { Button, ButtonProps } from './Button';
import styles from './Button.module.scss';

type SubmitButtonProps = {
  children: ReactNode;
  isLoading: boolean;
} & ButtonProps;

const _SubmitButton: ForwardRefRenderFunction<
  HTMLButtonElement & HTMLLinkElement,
  SubmitButtonProps
> = ({ children, isLoading, ...props }, ref) => {
  if (props.isSubmit === undefined) {
    props.isSubmit = true;
  }
  if (isLoading) {
    props.icon = undefined;
  }
  return (
    <Button {...props} ref={ref} disabled={isLoading}>
      {isLoading ? (
        <span className={styles.loader}>
          <span>Loading...</span>
          <img alt="loading" src="/loader.gif" height={22} width={22} />
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

_SubmitButton.displayName = 'SubmitButton';
export const SubmitButton = forwardRef(_SubmitButton);
