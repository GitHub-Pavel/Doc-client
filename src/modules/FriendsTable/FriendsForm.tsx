import { useCheckboxes } from 'hooks';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { UseQueryResult } from 'react-query';
import { FriendsPageDto } from 'types';
import styles from './FriendsTable.module.scss';
import { Table, TableRow } from './components';
import { useFriendsTableStore } from './friends-table.store';

type FriendsFormProps = {
  queryPage: UseQueryResult<FriendsPageDto, unknown>;
};

const _FriendsForm: ForwardRefRenderFunction<
  HTMLFormElement,
  FriendsFormProps
> = ({ queryPage }, ref) => {
  const { data, isLoading: pageLoading } = queryPage;
  const [addRef, handler] = useCheckboxes();
  const formLoading = useFriendsTableStore((state) => state.isLoading);
  const isLoading = formLoading || pageLoading;

  return (
    <form ref={ref} className={styles.form}>
      <Table
        ref={addRef()}
        onChange={handler}
        isLoading={isLoading}
        noFriends={!data?.friends?.length}
      >
        {!isLoading &&
          data?.friends?.map((friend, i) => (
            <TableRow
              friend={friend}
              onChange={handler}
              ref={addRef(i + 1)}
              key={friend.id + '-' + friend.chars}
            />
          ))}
      </Table>
    </form>
  );
};

_FriendsForm.displayName = 'FriendsForm';
export const FriendsForm = forwardRef(_FriendsForm);
