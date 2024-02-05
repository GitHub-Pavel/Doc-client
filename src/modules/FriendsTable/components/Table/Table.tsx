import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react';
import { Checkbox } from 'ui';
import styles from './Table.module.scss';

type TableProps = {
  children: ReactNode;
  noFriends?: boolean;
  isLoading?: boolean;
  onChange: (e: HTMLInputElement) => void;
};

const _Table: ForwardRefRenderFunction<HTMLInputElement, TableProps> = (
  { children, onChange, noFriends, isLoading },
  ref,
) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <div className={styles.checkboxWrap}>
                <Checkbox
                  ref={ref}
                  value="all"
                  name="friendsList"
                  onChange={onChange}
                  disabled={noFriends}
                />
              </div>
            </th>
            <th>Chars</th>
            <th>Group</th>
            <th>Places</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {isLoading && (
        <div className="text-center">
          <img
            src="/page_loader.gif"
            alt="Loading Friends"
            height="150"
            width="150"
          />
        </div>
      )}
      {noFriends && !isLoading && (
        <p className="text-muted text-opacity">Friends not founded</p>
      )}
    </>
  );
};

_Table.displayName = 'Table';
export const Table = forwardRef(_Table);
