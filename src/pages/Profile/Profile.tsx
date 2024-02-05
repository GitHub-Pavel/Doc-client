import { usePrivateRoute } from 'hooks';
import { Layout } from 'modules';
import { NotFound } from 'pages';
import { FC } from 'react';

export const Profile: FC = () => {
  const hasAccess = usePrivateRoute('profile');
  if (!hasAccess) return <NotFound />;

  return (
    <Layout>
      <NotFound />
    </Layout>
  );
};
