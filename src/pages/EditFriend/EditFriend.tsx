import { PageHero } from 'components';
import { usePrivateRoute } from 'hooks';
import { EditFriendForm, Layout } from 'modules';
import { NotFound } from 'pages';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { FriendDto } from 'types';
import { LoaderContent } from 'ui';
import { fetchFriend } from './edit-friend.helpers';

export const EditFriend: FC = () => {
  const { id } = useParams();
  const hasAccess = usePrivateRoute('editFriend');
  const { data, isError, isLoading } = useQuery<FriendDto>(
    'editFriend',
    fetchFriend(Number(id)),
    {
      cacheTime: 0,
    },
  );

  if (!hasAccess || (!isLoading && !data)) return <NotFound />;

  return (
    <Layout>
      <PageHero
        heading="Edit Friend"
        description="Изменить данные возвещателя"
      />
      <LoaderContent isLoading={isLoading} isError={isError}>
        {data?.friend && <EditFriendForm friend={data.friend} />}
      </LoaderContent>
    </Layout>
  );
};
