import classNames from 'classnames';
import { FC, MouseEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type LinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  disabled?: boolean;
  size?: 'small' | 'big';
  title?: string;
};

export const Link: FC<LinkProps> = ({
  children,
  className,
  disabled,
  size,
  ...props
}) => {
  const navigate = useNavigate();
  const linkClasses = classNames(className, size, {
    disabled: disabled,
  });
  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!disabled) {
      navigate(props.href);
    }
  };
  if (disabled) {
    props.href = undefined!;
  }
  return (
    <a className={linkClasses} onClick={clickHandler} {...props}>
      {children}
    </a>
  );
};
