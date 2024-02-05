import { ConfirmContent, Layout } from 'modules';
import { NotFound } from 'pages';
import { FC } from 'react';

export const AuthConfirm: FC = () => {
  const authTokenExpire = window.localStorage.getItem('auth-token-expire');

  if (!authTokenExpire) {
    return <NotFound />;
  }

  return (
    <Layout>
      <ConfirmContent />
    </Layout>
  );
};
