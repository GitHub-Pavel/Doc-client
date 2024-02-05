import { FC } from 'react';
import { Link } from 'ui';

export const Logo: FC = () => {
  return (
    <Link href="/">
      <img
        src="/jw-icon.png"
        alt="JW Doc"
        width={35}
        height={35}
        title="JW Doc"
      />
    </Link>
  );
};
