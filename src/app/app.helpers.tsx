import { PRIVATE_PAGES, UNAUTHORIZED_PAGES } from 'configs';
import { PageProps } from 'configs/pages';
import { getFetch } from 'helpers';
import { NotActivated, NotFound } from 'pages';
import { createBrowserRouter } from 'react-router-dom';
import { Roles, UserDto } from 'types';

export const userFetch = async () =>
  await getFetch('/auth/refresh-tokens', false, true);

export const accessToPages = (user: UserDto['user']) => {
  if (user?.roles.includes('NOTACTIVATE')) {
    return createBrowserRouter([{ path: '*', element: <NotActivated /> }]);
  }

  if (!user) {
    return createBrowserRouter([
      ...Object.values(UNAUTHORIZED_PAGES),
      { path: '*', element: <NotFound /> },
    ]);
  }

  const accessPages: PageProps[] = [];
  const arrPages = Object.values(PRIVATE_PAGES);

  arrPages.forEach((pageInfo) => {
    if (
      user.roles.includes(pageInfo.access as Roles) ||
      pageInfo.access === 'ALL' ||
      user.roles.includes('ADMIN')
    ) {
      accessPages.push(pageInfo);
    }
  });

  return createBrowserRouter([
    ...accessPages,
    { path: '*', element: <NotFound /> },
  ]);
};
