import classNames from 'classnames';
import { FC, ReactNode, useMemo, useRef } from 'react';
import styles from './Tooltip.module.scss';
import { currentPosition } from './tooltip.helpers';
import { useTooltip } from './tooltip.hooks';

type TooltipProps = {
  delay?: number;
  space?: number;
  className?: string;
  noResize?: boolean;
  noTriangle?: boolean;
  buttonView: ReactNode;
  contentView: ReactNode;
  on?: 'hover' | 'click';
};

export const Tooltip: FC<TooltipProps> = ({
  on = 'click',
  contentView,
  buttonView,
  noTriangle,
  className,
  noResize,
  space = 0,
  delay = 100,
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isOpen = useTooltip(wrapRef, on, delay);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const positionX = useMemo(
    () => currentPosition(wrapRef, noResize),
    [isOpen, wrapRef],
  );
  const contentStyles = { top: `calc(100% + ${space}px)`, ...positionX };

  const wrapClasses = classNames(styles.wrap, className, 'tooltip', {
    [styles.noTriangle]: noTriangle,
    open: isOpen,
  });
  const btnClasses = classNames(styles.btn, 'tooltip-btn', { active: isOpen });
  const contentClasses = classNames(styles.content, 'tooltip-wrap');

  return (
    <div className={wrapClasses} ref={wrapRef}>
      <button className={btnClasses}>{buttonView}</button>
      <div className={contentClasses} style={contentStyles}>
        {contentView}
      </div>
    </div>
  );
};
