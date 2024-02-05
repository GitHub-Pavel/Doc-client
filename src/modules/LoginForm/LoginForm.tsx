import { FC } from 'react';
import { Alert, Input, Link, SubmitButton } from 'ui';
import styles from './LoginForm.module.scss';
import { useLoginForm } from './login-form.hooks';

export const LoginForm: FC = () => {
  const { hasError, onSubmit, register, errors, isLoading } = useLoginForm();
  const error = hasError ? 'error' : 'primary';

  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          {...register('username', { required: true })}
          autoComplete="username"
          placeholder="Login"
          variant={error}
          type="text"
          icon="user"
          required
        />
        <Input
          {...register('password', { required: true })}
          autoComplete="current-password"
          placeholder="Password"
          variant={error}
          type="text"
          icon="lock"
          isPassword
          required
        />
        <SubmitButton isLoading={isLoading} isWide variant="primary">
          Sign in
        </SubmitButton>
      </form>
      <Alert
        variant="error"
        message={errors.root?.message}
        className={styles.error}
      />
      <div className={styles.footer}>
        <Link href="/sign-up" className={styles.link}>
          Registration
        </Link>
        <Link href="/auth-reset" className={styles.link}>
          Lost your password?
        </Link>
      </div>
    </div>
  );
};
