import { WINDOW_TYPES_VALUE } from 'configs';
import { useEffect, useState } from 'react';
import { WindowTypes } from 'types';

export const useWindowTypes = (): WindowTypes => {
  const [windowType, setType] = useState<WindowTypes>('desktop');
  const windowHandler = () => {
    const width = window.innerWidth;
    Object.keys(WINDOW_TYPES_VALUE).forEach((key) => {
      let leftValue = false;
      let rightValue = false;
      const values = WINDOW_TYPES_VALUE[key as WindowTypes];

      if (values[0] !== null && width > values[0]) {
        leftValue = true;
      }

      if (values[1] === null) {
        rightValue = true;
      } else if (values[1] >= width) {
        rightValue = true;
      }

      if (leftValue && rightValue) {
        setType(key as WindowTypes);
      }
    });
  };

  useEffect(() => {
    windowHandler();
    window.addEventListener('resize', windowHandler);
    return () => {
      window.removeEventListener('resize', windowHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowType;
};
