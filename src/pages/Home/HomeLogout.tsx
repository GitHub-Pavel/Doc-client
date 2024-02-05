import { HomeContainer, LoginForm, Layout } from 'modules';
import { FC } from 'react';

export const HomeLogout: FC = () => {
  return (
    <Layout>
      <HomeContainer>
        <LoginForm />
      </HomeContainer>
    </Layout>
  );
};
