import classNames from 'classnames';
import { useWindowTypes } from 'hooks';
import { ForwardRefRenderFunction, Fragment, forwardRef, useId } from 'react';
import { Friend } from 'types';
import { AccessLink, Button, Checkbox, SubmitButton } from 'ui';
import styles from './TableRow.module.scss';
import { useRemoveFriend } from './table-row.hooks';

type TableRowProps = {
  friend: Friend;
  onChange: (el: HTMLInputElement) => void;
};

const _TableRow: ForwardRefRenderFunction<HTMLInputElement, TableRowProps> = (
  { friend, onChange },
  ref,
) => {
  const [removeHandler, isLoading] = useRemoveFriend(friend.id);
  const windowType = useWindowTypes();

  const isWide = windowType === 'desktop';
  return (
    <tr>
      <td>
        <div className={styles.checkboxWrap}>
          <Checkbox
            ref={ref}
            name="friendsList"
            onChange={onChange}
            value={friend.id.toString()}
          />
        </div>
      </td>
      <td>
        <AccessLink
          path="/friend/:id"
          href={'/friend/' + friend.id}
          title={'To "&"'.replace('&', friend.chars)}
        >
          {friend.chars}
        </AccessLink>
      </td>
      <td>
        {friend.group ? (
          <AccessLink
            path="/group/:id"
            href={'/group/' + friend.groupId}
            title={'View & group'.replace('&', friend.group.group.toString())}
          >
            {friend.group.group}
          </AccessLink>
        ) : (
          <div className="text-opacity">No group</div>
        )}
      </td>
      <td>
        <div className={styles.placesWrap}>
          {friend.places.map((place, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const key = useId();
            const isExpired =
              (place.takeAt + 4 * 30 * 24 * 60 * 60 * 1000) / 10e3 >=
              Date.now() / 10e3;
            const linkClasses = classNames({ 'text-danger': isExpired });
            return (
              <Fragment key={key}>
                <AccessLink
                  path="/place/:id"
                  className={linkClasses}
                  href={'/place/' + place.id}
                  title={'View & place'.replace('&', place.number.toString())}
                >
                  {place.number}
                </AccessLink>
                {friend.places.length > i + 1 && ', '}
              </Fragment>
            );
          })}
        </div>
      </td>
      <td>
        <div className={styles.linksWrap}>
          <Button
            href={'/friend/' + friend.id + '/edit'}
            variant="primary"
            isWide={isWide}
            size="sm"
          >
            Изменить
          </Button>
          <SubmitButton
            size="sm"
            isWide={isWide}
            variant="danger"
            isSubmit={false}
            isLoading={isLoading}
            onClick={removeHandler}
          >
            Удалить
          </SubmitButton>
        </div>
      </td>
    </tr>
  );
};

_TableRow.displayName = 'TableRow';
export const TableRow = forwardRef(_TableRow);
