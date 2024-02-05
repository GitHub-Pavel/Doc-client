import { FC } from 'react';
import styles from './ConfirmInput.module.scss';
import { useConfirmInput } from './confirm-input.hooks';

export const ConfirmInput: FC = () => {
  const ref = useConfirmInput();

  return (
    <input type="text" name="authSecret" className={styles.field} ref={ref} />
  );
};
