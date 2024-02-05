import classNames from 'classnames';
import { ChangeEvent, ForwardRefRenderFunction, forwardRef } from 'react';
import styles from './Input.module.scss';
import { validateValue } from './input.helpers';

type InputSizes = 'sm' | 'lg' | 'hg';
type InputVariants = 'primary' | 'error' | 'warning' | 'success';

type InputTextProps = {
  type: 'text';
};

type InputNumberProps = {
  type: 'number';
};

type InputProps = (InputTextProps | InputNumberProps) & {
  name: string;
  icon?: string;
  value?: string;
  size?: InputSizes;
  noBorder?: boolean;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  isPassword?: boolean;
  placeholder?: string;
  defaultValue?: string;
  variant?: InputVariants;
  onUpdate?: (value: string) => void;
  autoComplete?: 'off' | 'current-password' | 'username';
};

const _Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    type,
    size,
    variant,
    noBorder,
    className,
    isPassword,
    name,
    icon,
    onUpdate,
    readonly,
    ...props
  },
  ref,
) => {
  const inputClasses = classNames(className, styles.field, {
    [styles[size!]]: size,
    [styles.flat]: noBorder,
    [styles[variant!]]: variant,
  });
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = validateValue(type, e.target.value);
    if (onUpdate) onUpdate(value);
    e.target.value = value;
  };
  const inputType = isPassword ? 'password' : 'text';

  if (props.defaultValue) {
    props.defaultValue = validateValue(type, props.defaultValue);
  }

  if (props.value) {
    props.value = validateValue(type, props.value);
  }

  return (
    <label className={styles.label}>
      <input
        ref={ref}
        {...props}
        name={name}
        type={inputType}
        readOnly={readonly}
        onInput={inputHandler}
        className={inputClasses}
      />
      {icon && <p className={classNames(styles.icon, 'fui-' + icon)} />}
    </label>
  );
};

_Input.displayName = 'Input';
export const Input = forwardRef(_Input);
