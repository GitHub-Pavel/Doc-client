import { FC } from 'react';
import { Button, Container, Section } from 'ui';
import styles from './HomeHero.module.scss';

export const HomeHero: FC = () => {
  return (
    <Section height="screen" noHeader>
      <div className={styles.background}>
        <video
          width="2560"
          height="1440"
          poster="/tmp/main.webp"
          autoPlay
          muted
          loop
        >
          <source src="/tmp/main.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.content}>
        <Container>
          <h1 className="h2">JW Documentation</h1>
          <p>Добро пожаловать в программу для организации жизни</p>
          <Button isWide href="/friends" variant="primary" size="lg">
            Go to Friends
          </Button>
        </Container>
      </div>
    </Section>
  );
};
