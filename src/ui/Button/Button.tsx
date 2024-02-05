import classNames from 'classnames';
import {
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
  MouseEvent,
  ReactNode,
  forwardRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Button.module.scss';

type ButtonVariants =
  | 'default'
  | 'primary'
  | 'info'
  | 'danger'
  | 'success'
  | 'warning'
  | 'inverse';
type ButtonSizes = 'hg' | 'lg' | 'sm' | 'xs' | 'reduce-on-xs';

type ButtonPrimaryProps = {
  icon?: string;
  isTip?: boolean;
  isDiv?: boolean;
  isWide?: boolean;
  isBlock?: boolean;
  disabled?: boolean;
  size?: ButtonSizes;
  className?: string;
  children: ReactNode;
  isEmbossed?: boolean;
  variant?: ButtonVariants;
};

type ButtonCallbackProps = {
  href?: undefined;
  isSubmit?: boolean;
  shouldOpenTab?: undefined;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

type ButtonNavigateProps = {
  href: string;
  onClick?: undefined;
  isSubmit?: undefined;
  shouldOpenTab?: boolean;
};

export type ButtonProps = (ButtonNavigateProps | ButtonCallbackProps) &
  ButtonPrimaryProps;

const _Button: ForwardRefRenderFunction<
  HTMLButtonElement & HTMLLinkElement,
  ButtonProps
> = (
  {
    children,
    onClick,
    className,
    shouldOpenTab,
    isEmbossed,
    isSubmit,
    variant,
    isBlock,
    isWide,
    isTip,
    isDiv,
    size,
    icon,
    ...props
  },
  ref,
) => {
  const navigate = useNavigate();
  const ButtonElement: any = isDiv ? 'div' : props.href ? 'a' : 'button';
  const clickHadnler = (
    e: MouseEvent<HTMLButtonElement & HTMLAnchorElement>,
  ) => {
    if (isSubmit) return;

    e.preventDefault();
    if (props.disabled) return;

    if (props.href && shouldOpenTab) {
      return window.open(props.href, '_blank')?.focus();
    }
    if (props.href) {
      return navigate(props.href);
    }
    if (onClick) {
      return onClick(e);
    }
  };

  const btnProps: ComponentPropsWithRef<'button'> | ComponentPropsWithRef<'a'> =
    {
      className: classNames(styles.btn, className, {
        [styles.disabled]: props.disabled,
        [styles.embossed]: isEmbossed,
        [styles[variant!]]: variant,
        [styles.block]: isBlock,
        [styles[size!]]: size,
        [styles.wide]: isWide,
        [styles.tip]: isTip,
      }),
      onClick: clickHadnler,
      ...props,
    };

  if (!props.href) {
    btnProps.type = isSubmit ? 'submit' : 'button';
  }

  return (
    <ButtonElement {...btnProps} ref={ref}>
      {icon && <div className={'fui-' + icon} />}
      {children}
    </ButtonElement>
  );
};

_Button.displayName = 'Button';
export const Button = forwardRef(_Button);
