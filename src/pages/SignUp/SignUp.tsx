import { HomeContainer, Layout, SignUpForm } from 'modules';
import { FC } from 'react';

export const SignUp: FC = () => {
  return (
    <Layout>
      <HomeContainer>
        <SignUpForm />
      </HomeContainer>
    </Layout>
  );
};
