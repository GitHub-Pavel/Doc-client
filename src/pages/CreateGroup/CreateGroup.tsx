import { PageHero } from 'components';
import { usePrivateRoute } from 'hooks';
import { CreateGroupForm, Layout } from 'modules';
import { NotFound } from 'pages';
import { FC } from 'react';

export const CreateGroup: FC = () => {
  const hasAccess = usePrivateRoute('createGroup');
  if (!hasAccess) return <NotFound />;

  return (
    <Layout>
      <PageHero heading="Creating Group" description="Новая группа" />
      <CreateGroupForm />
    </Layout>
  );
};
