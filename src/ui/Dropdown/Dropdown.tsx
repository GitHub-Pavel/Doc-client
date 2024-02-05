import classNames from 'classnames';
import { appEmitter } from 'main';
import {
  ForwardRefRenderFunction,
  MouseEvent,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Input, Tooltip } from 'ui';
import styles from './Dropdown.module.scss';
import { searchFilter } from './dropdown.helpers';

type DropdownProps = {
  name: string;
  multiple?: boolean;
  hasSearch?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  onUpdate?: (key: string) => void;
  values: Record<string, string> | null;
};

const _Dropdown: ForwardRefRenderFunction<HTMLInputElement, DropdownProps> = (
  { values, defaultValue, placeholder, name, onUpdate, hasSearch, multiple },
  ref,
) => {
  const [search, setSearch] = useState('');
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const [value, setValue] = useState(defaultValue || null);
  const filteredValues = useMemo(
    () => searchFilter(values, search),
    [search, values],
  );
  const valueHandler =
    (key: string | null) => (e: MouseEvent<HTMLButtonElement>) => {
      setSearch('');
      e.preventDefault();
      const input = labelRef.current?.querySelector('input');

      if (input) {
        input.value = key as string;
      }
      if (onUpdate) {
        onUpdate(key as string);
      }
      if (!multiple) {
        appEmitter.emit('tooltip/close');
      }
      setValue(() => key);
    };
  const btnClasses = classNames(styles.btn);
  const linkClasses = classNames('link', styles.value);
  const labelClasses = classNames(styles.label);
  const placeholderClasses = classNames(
    'placeholder',
    linkClasses,
    styles.placeholder,
  );
  const contentClasses = classNames(styles.content, {
    [styles.search]: hasSearch,
  });
  return (
    <label ref={labelRef} className={labelClasses}>
      <input
        className="hidden tooltip-refObject"
        value={String(value) || ''}
        type="text"
        name={name}
        ref={ref}
        readOnly
      />
      <Tooltip
        space={5}
        delay={1}
        className={styles.tooltip}
        buttonView={
          <Button
            icon="triangle-down-small"
            disabled={values === null}
            className={btnClasses}
            variant="default"
            size="lg"
            isWide
            isDiv
          >
            {value && filteredValues
              ? filteredValues[value]
              : placeholder
              ? placeholder
              : 'No selected'}
          </Button>
        }
        contentView={
          <div className={contentClasses}>
            {hasSearch && (
              <div className={styles.searchWrap}>
                <Input
                  name={name + '_search'}
                  onUpdate={setSearch}
                  placeholder="Search"
                  autoComplete="off"
                  variant="primary"
                  value={search}
                  type="text"
                />
              </div>
            )}
            <div className={styles.btns}>
              <button
                className={placeholderClasses}
                onClick={valueHandler(null)}
                disabled={!value}
                type="button"
              >
                No value
              </button>
              {filteredValues &&
                Object.keys(filteredValues).map((key) => (
                  <button
                    onClick={valueHandler(key)}
                    disabled={key === value}
                    className={linkClasses}
                    type="button"
                    key={key}
                  >
                    {filteredValues[key]}
                  </button>
                ))}
            </div>
          </div>
        }
        noTriangle
        noResize
      />
    </label>
  );
};

_Dropdown.displayName = 'Dropdown';
export const Dropdown = forwardRef(_Dropdown);
