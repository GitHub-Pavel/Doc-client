import { PageHero } from 'components';
import { usePrivateRoute } from 'hooks';
import { CreateFriendForm, Layout } from 'modules';
import { NotFound } from 'pages';
import { FC } from 'react';

export const CreateFriend: FC = () => {
  const hasAccess = usePrivateRoute('createFriend');
  if (!hasAccess) return <NotFound />;

  return (
    <Layout>
      <PageHero heading="Creating Friend" description="Новый возвещатель" />
      <CreateFriendForm />
    </Layout>
  );
};
