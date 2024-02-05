import { usePrivateRoute } from 'hooks';
import { HomeHero, Layout } from 'modules';
import { NotFound } from 'pages';
import { FC } from 'react';

export const HomeLogged: FC = () => {
  const hasAccess = usePrivateRoute('home');
  if (!hasAccess) return <NotFound />;

  return (
    <Layout>
      <HomeHero />
    </Layout>
  );
};
