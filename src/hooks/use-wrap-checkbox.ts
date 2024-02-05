import { appEmitter } from 'main';
import { MouseEvent } from 'react';

export const useWrapCheckbox = () => {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const chechbox = e.currentTarget.querySelector<HTMLInputElement>(
      'input[type=checkbox]',
    );
    const excludeTags = ['a', 'button'];
    const element = e.target as Element;
    if (chechbox && !excludeTags.includes(element.tagName.toLowerCase())) {
      appEmitter.emit('checkbox/change', chechbox, !chechbox.checked);
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const chechbox = e.currentTarget.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    const excludeTags = ['a', 'button'];
    const element = e.target as Element;

    if (
      excludeTags.includes(element.tagName.toLowerCase()) ||
      chechbox?.disabled
    ) {
      e.currentTarget.classList.add('nohover');
      return;
    }
    e.currentTarget.classList.remove('nohover');
  };

  return { onClick, onMouseMove };
};
