import { EMAIL_PATTERN } from 'configs';
import { FC } from 'react';
import { Alert, Input, Link, SubmitButton } from 'ui';
import styles from './SignUp.module.scss';
import { useSignUpForm } from './sign-up-form.hooks';

export const SignUpForm: FC = () => {
  const { errors, hasError, onSubmit, register } = useSignUpForm();
  const inputVariant = hasError ? 'error' : 'primary';
  return (
    <div className={styles.wrap}>
      <h6 className={styles.heading}>Sign Up</h6>
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          {...register('username', { required: true })}
          variant={inputVariant}
          placeholder="Username"
          autoComplete="off"
          type="text"
          icon="user"
          required
        />
        <Input
          {...register('email', {
            required: true,
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Invalid email address',
            },
          })}
          variant={inputVariant}
          placeholder="Email"
          autoComplete="off"
          type="text"
          icon="mail"
          required
        />
        <Input
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: 'Minimum password length 6 characters',
            },
          })}
          autoComplete="current-password"
          placeholder="Password"
          variant={inputVariant}
          type="text"
          icon="lock"
          isPassword
          required
        />
        <SubmitButton isLoading={false} isWide variant="primary">
          Register
        </SubmitButton>
      </form>
      <Alert
        variant="error"
        message={
          errors.root?.message ||
          errors.email?.message ||
          errors.password?.message
        }
        className={styles.alert}
      />
      <div className={styles.footer}>
        <Link href="/" className={styles.link}>
          Back to Sing In
        </Link>
      </div>
    </div>
  );
};
