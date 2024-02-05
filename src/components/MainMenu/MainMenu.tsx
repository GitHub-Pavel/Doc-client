import { PageProps } from 'configs/pages';
import { FC } from 'react';
import styles from './MainMenu.module.scss';
import { MenuItem } from './MenuItem';

type MainMenuProps = {
  list: PageProps[];
};

export const MainMenu: FC<MainMenuProps> = ({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((page) => (
        <MenuItem key={page.path} page={page} />
      ))}
    </ul>
  );
};
