import { FC } from 'react';
import { Link } from 'ui';
import styles from './HomeLogo.module.scss';
import { useHomeLogoGsap } from './home-logo.hooks';

export const HomeLogo: FC = () => {
  const boxRef = useHomeLogoGsap();
  return (
    <div className={styles.box} ref={boxRef}>
      <Link href="/">
        <img src="/jw-icon.png" width={110} height={110} alt="JW Doc" />
      </Link>
      <p className={styles.desc}>
        Welcome to <strong>JW Doc</strong>
      </p>
    </div>
  );
};
