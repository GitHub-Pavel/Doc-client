import { PageHero } from 'components';
import { usePrivateRoute } from 'hooks';
import { GroupsList, Layout } from 'modules';
import { NotFound } from 'pages';
import { FC } from 'react';

export const Groups: FC = () => {
  const hasAccess = usePrivateRoute('groups');
  if (!hasAccess) return <NotFound />;

  return (
    <Layout>
      <PageHero heading="Groups" description="Все группы собрания" />
      <GroupsList />
    </Layout>
  );
};
