import { Loader } from 'components';
import { Error500 } from 'pages';
import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { useUserStore } from 'store';
import { UserDto } from 'types';
import { accessToPages, userFetch } from './app.helpers';

export const App: FC = () => {
  const [allowedToFetch, setAllowedToFetch] = useState(true);
  const { user, setUser } = useUserStore((state) => state);
  const { data, isError, isLoading } = useQuery<UserDto>('user', userFetch, {
    enabled: allowedToFetch,
  });
  const routes = useMemo(() => accessToPages(user), [user]);

  useEffect(() => {
    setUser(data?.user || null);
  }, [data, setUser]);

  if (isLoading) return <Loader />;
  if (isError || typeof data === 'undefined') {
    return (
      <>
        <Loader isHide={true} />
        <Error500 stopFetching={() => setAllowedToFetch(false)} />
      </>
    );
  }

  return (
    <>
      <Loader isHide={true} />
      {!isLoading && <RouterProvider router={routes} />}
    </>
  );
};
