import { HomeLogo } from 'components';
import { FC, ReactNode } from 'react';
import styles from './HomeContainer.module.scss';

type HomeContainerProps = {
  children: ReactNode;
};

export const HomeContainer: FC<HomeContainerProps> = ({ children }) => {
  return (
    <section className={styles.wrap}>
      <div className={styles.box}>
        <HomeLogo />
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
};
