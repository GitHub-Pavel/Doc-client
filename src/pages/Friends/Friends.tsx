import { PageHero } from 'components';
import { usePrivateRoute } from 'hooks';
import { FriendsTable, Layout, SearchSection } from 'modules';
import { NotFound } from 'pages';
import { FC } from 'react';

export const Friends: FC = () => {
  const hasAccess = usePrivateRoute('friends');
  if (!hasAccess) return <NotFound />;

  return (
    <Layout>
      <PageHero heading="Friends" description="Все возвещатели собрания" />
      <SearchSection cacheTag="friends" />
      <FriendsTable />
    </Layout>
  );
};
