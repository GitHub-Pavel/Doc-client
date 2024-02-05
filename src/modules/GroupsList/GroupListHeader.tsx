import classNames from 'classnames';
import { usePrivateRoute, useWrapCheckbox } from 'hooks';
import {
  ForwardRefRenderFunction,
  MutableRefObject,
  forwardRef,
  useRef,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Alert, Button, Checkbox } from 'ui';
import styles from './GroupsList.module.scss';
import { useRemoveGroups } from './groups-list.hooks';
import { useGroupsListStore } from './groups-list.store';

type GroupsListHeaderProps = {
  disabled?: boolean;
  onChange: (el: HTMLInputElement) => void;
  formRef: MutableRefObject<HTMLFormElement | null>;
};

const _GroupsListHeader: ForwardRefRenderFunction<
  HTMLInputElement,
  GroupsListHeaderProps
> = ({ disabled, onChange, formRef }, ref) => {
  const checkbox = useWrapCheckbox();
  const chechboxRef = useRef<HTMLInputElement | null>(null);
  const hasAccess = usePrivateRoute('createGroup');
  const error = useGroupsListStore((state) => state.error);
  const removeHandler = useRemoveGroups(formRef, chechboxRef);
  const checkboxClasses = classNames(styles.headerCheckbox, 'checkbox-hover');

  if (!hasAccess) return null;

  return (
    <div className={styles.header}>
      <div className={styles.links}>
        <div className={checkboxClasses} {...checkbox}>
          <Checkbox
            value="all"
            name="groupList"
            label="All groups"
            disabled={disabled}
            onChange={onChange}
            ref={mergeRefs([ref, chechboxRef])}
          />
        </div>
        <button
          disabled={disabled}
          onClick={removeHandler}
          className="link fui-trash"
          title={disabled ? undefined : 'Delete'}
        />
        <Alert variant="error" message={error} />
      </div>
      <div className={styles.createBtn}>
        <Button href="/group/create" variant="primary" isWide>
          Создать
        </Button>
      </div>
    </div>
  );
};

_GroupsListHeader.displayName = 'GroupsListHeader';
export const GroupsListHeader = forwardRef(_GroupsListHeader);
