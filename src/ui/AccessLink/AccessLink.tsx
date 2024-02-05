import { PRIVATE_PAGES } from 'configs';
import { FC, useMemo } from 'react';
import { useUserStore } from 'store';
import { Roles } from 'types';
import { Link, LinkProps } from '../Link/Link';

type AccessLinkProps = {
  path: string;
} & LinkProps;

export const AccessLink: FC<AccessLinkProps> = ({
  children,
  path,
  ...props
}) => {
  const user = useUserStore((state) => state.user);
  const hasAccess: boolean = useMemo(() => {
    let userHasAccessToPage = false;
    Object.values(PRIVATE_PAGES).forEach((page) => {
      if (page.path === path && user?.roles.includes(page.access as Roles)) {
        userHasAccessToPage = true;
      }
    });
    return userHasAccessToPage;
  }, [path, user]);

  if (!hasAccess) {
    props.href = undefined!;
    props.title = undefined;
    return <span {...props}>{children}</span>;
  }

  return <Link {...props}>{children}</Link>;
};
