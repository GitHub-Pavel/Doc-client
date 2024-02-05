import { useSignOut } from 'hooks';
import { FC } from 'react';
import { Button, Link } from 'ui';
import styles from './Header.module.scss';

export const ProfileTooltip: FC = () => {
  const signOut = useSignOut();
  const isDisabled = window.location.pathname === '/profile';
  return (
    <ul className={styles.list}>
      <li>
        <Link href="/profile" disabled={isDisabled}>
          Settings
        </Link>
      </li>
      <li>
        <Button variant="inverse" size="sm" onClick={signOut} icon="exit">
          Sign Out
        </Button>
      </li>
    </ul>
  );
};
