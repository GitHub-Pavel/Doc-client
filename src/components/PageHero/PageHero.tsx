import { FC } from 'react';
import { Container, Section } from 'ui';
import styles from './PageHero.module.scss';

type PageHeroProps = {
  heading: string;
  description?: string;
};

export const PageHero: FC<PageHeroProps> = ({ heading, description }) => {
  return (
    <Section className={styles.hero} noHeader>
      <Container size="big" noSpace>
        <h1>{heading}</h1>
        {description && <p>{description}</p>}
      </Container>
    </Section>
  );
};
