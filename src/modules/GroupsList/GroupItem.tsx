import classNames from 'classnames';
import { useWrapCheckbox } from 'hooks';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { useUserStore } from 'store';
import { Group } from 'types';
import { AccessLink, Button, Checkbox, SubmitButton } from 'ui';
import styles from './GroupsList.module.scss';
import { useGroupDelete } from './groups-list.hooks';

type GroupsItemProps = {
  group: Group;
  onChange: (el: HTMLInputElement) => void;
};

const _GroupsItem: ForwardRefRenderFunction<
  HTMLInputElement,
  GroupsItemProps
> = ({ group, onChange }, ref) => {
  const checkbox = useWrapCheckbox();
  const user = useUserStore((state) => state.user);
  const hasAccess = user?.roles.includes('GROUPMOD');
  const [deleteHandler, isLoading] = useGroupDelete(group.id);
  const cardClasses = classNames(styles.card, {
    'checkbox-hover': hasAccess,
  });

  return (
    <div className={cardClasses} {...checkbox}>
      {hasAccess && (
        <div className={styles.cardCheckbox}>
          <Checkbox
            ref={ref}
            name="groupList"
            onChange={onChange}
            value={group.id.toString()}
          />
        </div>
      )}
      <div>
        <AccessLink
          path="/group/:id"
          href={`/group/${group.id}`}
          className={styles.cardTitle}
        >
          Group {group.group}
        </AccessLink>
      </div>
      <div className={styles.cardDesc}>
        <div>Group Helper:</div>
        <AccessLink
          title={`View ${group.leadChars}`}
          href={`/friend/${group.leadId}`}
          disabled={!group.leadId}
          path="/friend/:id"
        >
          {group.leadChars || <span className="text-opacity">No helper</span>}
        </AccessLink>
      </div>
      {hasAccess && (
        <div className={styles.cardBtns}>
          <Button
            href={'/group/' + group.id + '/edit'}
            variant="primary"
            size="sm"
          >
            Изменить
          </Button>
          <SubmitButton
            size="sm"
            variant="danger"
            isSubmit={false}
            isLoading={isLoading}
            onClick={deleteHandler}
          >
            Удалить
          </SubmitButton>
        </div>
      )}
    </div>
  );
};

_GroupsItem.displayName = 'GroupsItem';
export const GroupsItem = forwardRef(_GroupsItem);
