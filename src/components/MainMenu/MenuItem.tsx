import { PageProps } from 'configs/pages';
import { FC } from 'react';
import { Link } from 'ui';
import styles from './MainMenu.module.scss';

type MenuItemProps = {
  page: PageProps;
};

export const MenuItem: FC<MenuItemProps> = ({ page }) => {
  const isDisabled =
    page.path === window.location.pathname ||
    window.location.pathname.includes(page.path + '/paged');
  const title = isDisabled ? undefined : page.menuName;
  return (
    <li>
      <Link
        title={title}
        href={page.path!}
        disabled={isDisabled}
        className={styles.link}
      >
        {page.menuName}
      </Link>
    </li>
  );
};
