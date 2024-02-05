import classNames from 'classnames';
import { FC } from 'react';
import styles from './Alert.module.scss';

type AlertVariants = 'error' | 'success' | 'info';

type AlertProps = {
  variant: AlertVariants;
  className?: string;
  message?: string | false | null;
};

export const Alert: FC<AlertProps> = ({ message, className, variant }) => {
  if (!message || message === '') return null;
  const alertClasses = classNames(
    'extra-small',
    styles[variant],
    styles.alert,
    className,
  );
  return <p className={alertClasses}>{message}</p>;
};
