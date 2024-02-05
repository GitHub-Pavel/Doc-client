import { FC } from 'react';
import { Input, Link, SubmitButton } from 'ui';
import styles from './LostPassForm.module.scss';

export const LostPassForm: FC = () => {
  return (
    <div className={styles.wrap}>
      <h6 className={styles.heading}>Reset password</h6>
      <form className={styles.form}>
        <Input
          placeholder="Enter your email"
          name="email"
          type="text"
          icon="mail"
          required
        />
        <SubmitButton isLoading={false} isWide variant="primary">
          Reset
        </SubmitButton>
      </form>
      <Link href="/" className={styles.link}>
        Back to Sign In
      </Link>
    </div>
  );
};
