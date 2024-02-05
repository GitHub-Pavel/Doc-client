import { HomeContainer, Layout, LostPassForm } from 'modules';
import { FC } from 'react';

export const AuthReset: FC = () => {
  return (
    <Layout>
      <HomeContainer>
        <LostPassForm />
      </HomeContainer>
    </Layout>
  );
};
