import { usePrivateRoute } from 'hooks';
import { Layout } from 'modules';
import { NotFound } from 'pages';
import { FC } from 'react';
import { Container, Section } from 'ui';

export const Users: FC = () => {
  const hasAccess = usePrivateRoute('users');
  if (!hasAccess) return <NotFound />;

  return (
    <Layout>
      <Section height="screen" noHeader>
        <Container size="big" noSpace>
          Users
        </Container>
      </Section>
    </Layout>
  );
};
