import { FC, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { FriendsPageDto } from 'types';
import { Container, Section } from 'ui';
import { FriendsForm } from './FriendsForm';
import styles from './FriendsTable.module.scss';
import { Header } from './components';
import { friendsFetch } from './friends-table.helpers';
import { useFriendsTableStore } from './friends-table.store';

export const FriendsTable: FC = () => {
  const { paged } = useParams();
  const formRef = useRef<HTMLFormElement | null>(null);
  const queryPage = useQuery<FriendsPageDto>(
    ['friends', window.location.search],
    friendsFetch(+paged! || 0),
  );
  const setError = useFriendsTableStore((state) => state.setError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setError(), []);
  return (
    <Section className={styles.section}>
      <Container>
        <Header formRef={formRef} disabled={!queryPage.data?.friends} />
        <FriendsForm queryPage={queryPage} ref={formRef} />
      </Container>
    </Section>
  );
};
