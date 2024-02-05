import { MutableRefObject } from 'react';

export const currentPosition = (
  wrapRef: MutableRefObject<HTMLDivElement | null>,
  noResize?: boolean,
) => {
  const btnWidth = wrapRef.current?.offsetWidth || 0;
  const wrap = wrapRef.current?.querySelector('.tooltip-wrap');
  const positionX = wrapRef.current?.offsetLeft || 0;
  const contentWidth = wrap?.clientWidth || 0;
  const btnEndX = positionX + btnWidth;
  const halfContent = contentWidth / 2 + 20;
  const hasRightOverview = btnEndX + halfContent > window.innerWidth;
  const initialValue = {
    left: '50%',
    transform: 'translateX(-50%)',
    '--triangle-left': '50%',
    '--triangle-transform': 'translateX(-50%)',
  };

  if (noResize) return initialValue;

  if (hasRightOverview) {
    return {
      right: '0',
      transform: 'translateX(10px)',
      '--triangle-left': `calc(100% - ${btnWidth / 2}px )`,
      '--triangle-transform': 'translateX(-100%)',
    };
  }

  return initialValue;
};
