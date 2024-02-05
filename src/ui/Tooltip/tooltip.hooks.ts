import { useDebounce } from 'hooks';
import { appEmitter } from 'main';
import { MutableRefObject, useEffect, useState } from 'react';

export const useTooltip = (
  wrapRef: MutableRefObject<HTMLDivElement | null>,
  on: 'hover' | 'click',
  delay: number,
) => {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prevState) => !prevState);
  const debounceIsOpen = useDebounce<boolean>(isOpen, delay);

  useEffect(() => {
    const btn = wrapRef.current?.querySelector('button');
    const innerElement = wrapRef.current?.querySelector('button > *');

    const openHandler = () => {
      if (innerElement?.hasAttribute('disabled')) {
        return;
      }
      setOpen(true);
    };
    const closeHandler = () => {
      if (innerElement?.hasAttribute('disabled')) {
        return;
      }
      setOpen(false);
    };
    const clickHandler = (e: any) => {
      if (innerElement?.hasAttribute('disabled')) {
        return;
      }

      if (e.target === btn || e.target.closest('button') === btn) {
        e.preventDefault();
        toggleOpen();
      } else if (
        !e.target.classList.contains('tooltip-refObject') &&
        e.target.closest('.tooltip') !== wrapRef.current
      ) {
        setOpen((prevState) => (prevState ? false : prevState));
      }
    };

    if (on === 'click') {
      window.addEventListener('click', clickHandler);
    }
    if (on === 'hover') {
      wrapRef.current?.addEventListener('mousemove', openHandler);
      wrapRef.current?.addEventListener('mouseleave', closeHandler);
    }

    appEmitter.on('tooltip/close', closeHandler);

    return () => {
      appEmitter.off('tooltip/close', closeHandler);
      window.removeEventListener('click', clickHandler);
      wrapRef.current?.removeEventListener('mousemove', openHandler);
      wrapRef.current?.removeEventListener('mouseleave', closeHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return debounceIsOpen;
};
