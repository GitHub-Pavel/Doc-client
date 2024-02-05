import classNames from 'classnames';
import { FC } from 'react';

type LoaderProps = {
  isHide?: boolean;
};

export const Loader: FC<LoaderProps> = ({ isHide }) => {
  const loaderClasses = classNames('page-loader', {
    'page-loader--hide': isHide,
  });
  return (
    <div className={loaderClasses}>
      <img src="/page_loader.gif" alt="Loading" width="200" height="200" />
    </div>
  );
};
