import { ConfirmInput, ConfirmTimer } from 'components';
import { FC } from 'react';
import { Alert } from 'ui';
import { HomeContainer } from '../HomeContainer/HomeContainer';
import styles from './ConfirmContent.module.scss';

export const ConfirmContent: FC = () => {
  const authTokenExpire = window.localStorage.getItem('auth-token-expire');
  return (
    <HomeContainer>
      <h6 className={styles.heading}>Enter secret</h6>
      <ConfirmInput />
      <ConfirmTimer timer={+authTokenExpire!} />
      <Alert
        variant="info"
        className={styles.alert}
        message="Вам на почту отправлено письмо с секретным ключем авторизации"
      />
    </HomeContainer>
  );
};
