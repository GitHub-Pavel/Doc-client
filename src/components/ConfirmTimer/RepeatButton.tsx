import { FC } from 'react';
import { useRepeatQuery } from './confirm-timer.hooks';

type RepeatButtonProps = {
  onQuery: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void;
};

export const RepeatButton: FC<RepeatButtonProps> = ({ onQuery }) => {
  const [clickHandler, isLoading] = useRepeatQuery(onQuery);
  if (!clickHandler) return null;
  if (isLoading)
    return <img src="/loader.gif" alt="loading" width="20" height="20" />;
  return (
    <button className="link extra-small" onClick={clickHandler}>
      Send message again?
    </button>
  );
};
