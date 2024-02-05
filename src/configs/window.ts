import { WindowTypes } from 'types';

type WindowValue = number | null;

export const WINDOW_TYPES_VALUE: Record<
  WindowTypes,
  [WindowValue, WindowValue]
> = {
  desktop: [1200, null],
  tablet: [768, 1200],
  mobile: [568, 768],
  extra: [0, 568],
};
