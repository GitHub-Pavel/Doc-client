import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import styles from './Section.module.scss';

type SectionProps = {
  height?: 'screen' | 'auto';
  noHeader?: boolean;
  className?: string;
  children: ReactNode;
};

export const Section: FC<SectionProps> = ({
  height = 'auto',
  className,
  children,
  noHeader,
}) => {
  const sectionClasses = classNames(className, {
    [styles.screen]: height === 'screen',
    [styles.noHeader]: noHeader,
  });
  return <section className={sectionClasses}>{children}</section>;
};
