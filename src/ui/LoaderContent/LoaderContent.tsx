import { FC, ReactNode } from 'react';

type LoaderContentProps = {
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
};

export const LoaderContent: FC<LoaderContentProps> = ({
  children,
  isError,
  isLoading,
}) => {
  if (isError)
    return <div className="text-muted text-opacity">Что-то пошло не так</div>;

  if (isLoading && !isError)
    return (
      <div className="text-center">
        <img
          src="/page_loader.gif"
          width={150}
          height={150}
          alt="Content Loadign"
        />
      </div>
    );

  return children;
};
