import { FC } from 'react';
import { Alert, Container, Dropdown, Input, Section, SubmitButton } from 'ui';
import styles from './CreateFriendForm.module.scss';
import {
  useCreateFriendForm,
  useGroupValues,
} from './create-friend-form.hooks';

export const CreateFriendForm: FC = () => {
  const groupValues = useGroupValues();
  const { errors, hasError, isLoading, onSubmit, register, setValue } =
    useCreateFriendForm();
  return (
    <Section>
      <Container>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            size="hg"
            type="text"
            icon="user"
            autoComplete="off"
            placeholder="Chars"
            {...register('chars', { required: true })}
          />
          <Dropdown
            values={groupValues}
            {...register('group')}
            placeholder="No group selected"
            onUpdate={(key) => setValue('group', key)}
          />
          <SubmitButton
            isWide
            size="lg"
            icon="plus"
            variant="primary"
            isLoading={isLoading}
            className={styles.btn}
          >
            Create Friend
          </SubmitButton>
          {hasError && <Alert variant="error" message={errors.root?.message} />}
        </form>
      </Container>
    </Section>
  );
};
