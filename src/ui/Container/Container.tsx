import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import styles from './Container.module.scss';

type ContainerSizes = 'primary' | 'big';
type ContainerProps = {
  noSpace?: boolean;
  children: ReactNode;
  size?: ContainerSizes;
};

export const Container: FC<ContainerProps> = ({
  size = 'primary',
  children,
  noSpace,
}) => {
  const containerClasses = classNames(styles.container, {
    [styles[size]]: size,
    [styles.noSpace]: noSpace,
  });
  return <div className={containerClasses}>{children}</div>;
};
