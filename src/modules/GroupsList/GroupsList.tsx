import { PRIMARY_ROW } from 'configs';
import { useCheckboxes } from 'hooks';
import { FC, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { GroupsDto } from 'types';
import { Container, LoaderContent, Row, Section } from 'ui';
import { GroupsItem } from './GroupItem';
import { GroupsListHeader } from './GroupListHeader';
import styles from './GroupsList.module.scss';
import { groupsFetch } from './groups-list.helpers';
import { useGroupsListStore } from './groups-list.store';

export const GroupsList: FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    data,
    isLoading: pageLoading,
    isError,
  } = useQuery<GroupsDto>('groups', groupsFetch);
  const [addRef, checkboxHandler] = useCheckboxes();
  const formLoading = useGroupsListStore((state) => state.isLoading);
  const setError = useGroupsListStore((state) => state.setError);
  const isLoading = formLoading || pageLoading;
  const notGroups = !data?.groups?.length && !isError && !isLoading;
  const handler = (e: HTMLInputElement) => {
    setError();
    checkboxHandler(e);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setError(), []);
  return (
    <Section className={styles.section}>
      <Container>
        <GroupsListHeader
          ref={addRef()}
          formRef={formRef}
          disabled={notGroups}
          onChange={handler}
        />
        <form ref={formRef}>
          <LoaderContent isError={isError} isLoading={isLoading}>
            <Row media={PRIMARY_ROW}>
              {data?.groups?.map((group, key) => (
                <GroupsItem
                  group={group}
                  ref={addRef(key + 1)}
                  onChange={handler}
                  key={'group-' + group.id.toString()}
                />
              ))}
            </Row>
          </LoaderContent>
          {notGroups && (
            <div className="text-muted text-opacity">Groups not founded</div>
          )}
        </form>
      </Container>
    </Section>
  );
};
