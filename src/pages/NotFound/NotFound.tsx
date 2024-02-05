import { FC } from 'react';
import { Button, Container } from 'ui';
import styles from './NotFound.module.scss';

export const NotFound: FC = () => {
  return (
    <section className={styles.view}>
      <Container>
        <div className={styles.wrap}>
          <div className={styles.error}>404</div>
          <h3 className={styles.heading}>Page not founded</h3>
          <Button href="/" variant="primary" size="lg" isWide>
            Go to Home
          </Button>
        </div>
      </Container>
    </section>
  );
};
