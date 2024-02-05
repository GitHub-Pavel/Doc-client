import classNames from 'classnames';
import { MainMenu } from 'components/MainMenu/MainMenu';
import { getPrivatePages } from 'helpers';
import { FC } from 'react';
import { useUserStore } from 'store';
import { Container, Tooltip } from 'ui';
import styles from './Header.module.scss';
import { Logo } from './Logo';
import { ProfileTooltip } from './ProfileTooltip';

export const Header: FC = () => {
  const user = useUserStore((state) => state.user);
  const menuPages = getPrivatePages(user!, {
    exclude: ['home'],
  });
  const btnClasses = classNames('fui-user', styles.btn);
  return (
    <header className={styles.header}>
      <Container size="big">
        <div className={styles.row}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <nav className={styles.menu}>
            <MainMenu list={menuPages} />
          </nav>
          <div>
            <Tooltip
              delay={1}
              space={24}
              contentView={<ProfileTooltip />}
              buttonView={<div className={btnClasses} title="User" />}
            />
          </div>
        </div>
      </Container>
    </header>
  );
};
