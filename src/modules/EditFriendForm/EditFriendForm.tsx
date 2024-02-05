import { FC } from 'react';
import { Friend } from 'types';
import { Alert, Container, Dropdown, Input, Section, SubmitButton } from 'ui';
import styles from './EditFriendForm.module.scss';
import { useEditFriendForm, useGroupValues } from './edit-friend-form.hooks';

type EditFriendForm = {
  friend: Friend;
};

export const EditFriendForm: FC<EditFriendForm> = ({ friend }) => {
  const groupValues = useGroupValues();
  const { errors, hasError, isLoading, onSubmit, register, setValue } =
    useEditFriendForm(friend);
  const groupdId = friend.groupId || undefined;

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
            defaultValue={friend.chars}
            {...register('chars', { required: true })}
          />
          <Dropdown
            values={groupValues}
            {...register('group')}
            defaultValue={groupdId}
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
            Edit Friend
          </SubmitButton>
          {hasError && <Alert variant="error" message={errors.root?.message} />}
        </form>
      </Container>
    </Section>
  );
};
