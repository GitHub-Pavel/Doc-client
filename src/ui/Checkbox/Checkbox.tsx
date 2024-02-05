import classNames from 'classnames';
import { appEmitter } from 'main';
import {
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
  MouseEvent,
  forwardRef,
  useEffect,
} from 'react';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
  name: string;
  value: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange: (checkbox: HTMLInputElement) => void;
};

const _Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { name, label, defaultChecked, onChange, value, disabled, className },
  ref,
) => {
  const inputProps: ComponentPropsWithRef<'input'> = {
    ref,
    name,
    value,
    type: 'checkbox',
    className: classNames(styles.input, {
      [styles.hasContent]: label,
      [styles.nohover]: disabled,
    }),
  };
  const labelClasses = classNames(styles.checkbox, className, {
    [styles.hasContent]: label,
    [styles.disabled]: disabled,
  });

  const clickHanlder = (e: MouseEvent<HTMLLabelElement>) => {
    const inputEl = e.currentTarget.querySelector('input');
    if (inputEl) {
      onChange(inputEl);
    }
  };

  const checboxChange = (input: HTMLInputElement, checked = false) => {
    if (input.disabled) return;
    input.checked = checked;
    onChange(input);
  };

  if (defaultChecked) {
    inputProps.checked = defaultChecked;
  }
  if (disabled) {
    inputProps.disabled = true;
  }

  useEffect(() => {
    appEmitter.on('checkbox/change', checboxChange);
    return () => {
      appEmitter.off('checkbox/change', checboxChange);
    };
  }, []);

  return (
    <label className={labelClasses} onClick={clickHanlder}>
      <input {...inputProps} />
      <span className={styles.icons}>
        <span className={styles.iconUnchecked} />
        <span className={styles.iconChecked} />
      </span>
      {label && <div className={styles.content}>{label}</div>}
    </label>
  );
};

_Checkbox.displayName = 'Checkbox';
export const Checkbox = forwardRef(_Checkbox);
