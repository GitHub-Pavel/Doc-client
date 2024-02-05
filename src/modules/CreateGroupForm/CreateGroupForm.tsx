import { FC } from 'react';
import { Alert, Container, Dropdown, Input, Section, SubmitButton } from 'ui';
import styles from './CreateGroupForm.module.scss';
import { useCreateGroupForm, useFriendValues } from './create-group-form.hooks';

export const CreateGroupForm: FC = () => {
  const friendsDropdown = useFriendValues();
  const { errors, hasError, isLoading, onSubmit, register, setValue } =
    useCreateGroupForm();
  return (
    <Section>
      <Container>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            size="hg"
            type="number"
            autoComplete="off"
            icon="list-thumbnailed"
            placeholder="Group number"
            {...register('number', { required: true })}
          />
          <Dropdown
            hasSearch
            {...register('leadId')}
            values={friendsDropdown}
            placeholder="No helper selected"
            onUpdate={(id) => setValue('leadId', +id)}
          />
          <SubmitButton
            isWide
            size="lg"
            icon="plus"
            variant="primary"
            isLoading={isLoading}
            className={styles.btn}
          >
            Create Group
          </SubmitButton>
          {hasError && <Alert variant="error" message={errors.root?.message} />}
        </form>
      </Container>
    </Section>
  );
};
