import { Header } from 'components';
import { FC, ReactNode } from 'react';
import { useUserStore } from 'store';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {user && <Header />}
      <main>{children}</main>
    </>
  );
};
