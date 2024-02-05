import { useFriendsTableStore } from 'modules/FriendsTable/friends-table.store';
import { FC, MutableRefObject } from 'react';
import { Alert, Button } from 'ui';
import styles from './Header.module.scss';
import { useRemoveFriends } from './header.hooks';

type HeaderProps = {
  disabled?: boolean;
  formRef: MutableRefObject<HTMLFormElement | null>;
};

export const Header: FC<HeaderProps> = ({ formRef, disabled }) => {
  const removeHandler = useRemoveFriends(formRef);
  const error = useFriendsTableStore((state) => state.error);
  return (
    <div className={styles.header}>
      <div className={styles.links}>
        <button
          title={disabled ? undefined : 'Delete'}
          className="link fui-trash"
          onClick={removeHandler}
          disabled={disabled}
        />
        <button className="link" disabled={disabled}>
          Изменить группу
        </button>
        <Alert variant="error" message={error} />
      </div>
      <div className={styles.createBtn}>
        <Button href="/friend/create" variant="primary" isWide>
          Создать
        </Button>
      </div>
    </div>
  );
};
