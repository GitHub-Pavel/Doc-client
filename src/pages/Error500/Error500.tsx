import { FC, useEffect } from 'react';
import { Container } from 'ui';
import styles from './Error500.module.scss';

type Error500Props = {
  stopFetching: () => void;
};

export const Error500: FC<Error500Props> = ({ stopFetching }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => stopFetching(), []);
  return (
    <section className={styles.view}>
      <Container>
        <div className={styles.wrap}>
          <div className={styles.error}>500</div>
          <h3>Server-side error occurred</h3>
        </div>
      </Container>
    </section>
  );
};
