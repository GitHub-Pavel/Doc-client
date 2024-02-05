import { PRIVATE_PAGES } from 'configs';
import { PrivatePagesName } from 'configs/pages';
import { useUserStore } from 'store';
import { Roles } from 'types';

export const usePrivateRoute = (page: PrivatePagesName) => {
  const roles = useUserStore((state) => state.user?.roles);

  if (!roles) return false;
  if (
    roles.includes(PRIVATE_PAGES[page].access as Roles) ||
    PRIVATE_PAGES[page].access === 'ALL' ||
    roles.includes('ADMIN')
  )
    return true;
  return false;
};
