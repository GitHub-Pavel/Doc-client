import { FC } from 'react';
import { useTimer } from 'react-timer-hook';
import styles from './ConfirmTimer.module.scss';
import { RepeatButton } from './RepeatButton';
import { num2Preview } from './confirm-timer.helpers';

type ConfirmTimerProps = {
  timer: number;
};

export const ConfirmTimer: FC<ConfirmTimerProps> = ({ timer }) => {
  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: new Date(timer),
    autoStart: true,
  });
  return (
    <div className={styles.timer}>
      {isRunning ? (
        <div className="extra-small">
          <span>{num2Preview(minutes)}</span>
          <span>:</span>
          <span>{num2Preview(seconds)}</span>
        </div>
      ) : (
        <RepeatButton onQuery={restart} />
      )}
    </div>
  );
};
