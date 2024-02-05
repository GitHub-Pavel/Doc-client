import { useSignOut } from 'hooks';
import { FC } from 'react';
import { Button, Container } from 'ui';
import styles from './NotActivated.module.scss';

export const NotActivated: FC = () => {
  const signOut = useSignOut();
  return (
    <section className={styles.view}>
      <Container>
        <div className={styles.wrap}>
          <div className={styles.error}>Not Activated</div>
          <h3 className={styles.heading}>Your account is not activated yet</h3>
          <Button variant="info" size="lg" isWide onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </Container>
    </section>
  );
};
