import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Media } from 'types';
import styles from './Row.module.scss';
import { useRowStyles } from './row.hooks';

export type MediaRowProps = {
  columns: number;
  gap: number;
};

type RowProps = {
  children: ReactNode;
  media: Media<MediaRowProps>;
};

export const Row: FC<RowProps> = ({ children, media }) => {
  const mediaStyles = useRowStyles(media);
  const rowClasses = classNames(styles.row);
  return (
    <div className={rowClasses} style={mediaStyles}>
      {children}
    </div>
  );
};
