import { PRIVATE_PAGES, PageProps, PrivatePagesName } from 'configs/pages';
import { Roles, User } from 'types';

type ExcludePagesProps = {
  include?: undefined;
  exclude: PrivatePagesName[];
};

type IncludePagesProps = {
  include: PrivatePagesName[];
  exclude?: undefined;
};

type GetPagesProps = IncludePagesProps | ExcludePagesProps;

export const getPrivatePages = (user: User, options: GetPagesProps) => {
  const currentPages: PageProps[] = [];

  if (options.exclude) {
    Object.keys(PRIVATE_PAGES).forEach((key) => {
      const pageName = key as PrivatePagesName;
      if (
        !options.exclude.includes(pageName) &&
        PRIVATE_PAGES[pageName].menuName
      ) {
        if (
          user.roles.includes('ADMIN') ||
          PRIVATE_PAGES[pageName].access === 'ALL' ||
          user.roles.includes(PRIVATE_PAGES[pageName].access as Roles)
        ) {
          currentPages.push(PRIVATE_PAGES[pageName]);
        }
      }
    });
  }

  if (options.include) {
    options.include.forEach((key) => {
      const pageName = key as PrivatePagesName;
      if (!PRIVATE_PAGES[pageName].menuName) return;
      if (
        user.roles.includes('ADMIN') ||
        PRIVATE_PAGES[pageName].access === 'ALL' ||
        user.roles.includes(PRIVATE_PAGES[pageName].access as Roles)
      ) {
        currentPages.push(PRIVATE_PAGES[pageName]);
      }
    });
  }

  return currentPages;
};
