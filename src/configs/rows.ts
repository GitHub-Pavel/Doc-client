import { Media } from 'types';
import { MediaRowProps } from 'ui/Row/Row';

export const PRIMARY_ROW: Media<MediaRowProps> = {
  desktop: {
    columns: 4,
    gap: 20,
  },
  tablet: {
    columns: 3,
    gap: 20,
  },
  mobile: {
    columns: 2,
    gap: 20,
  },
  extra: {
    columns: 1,
    gap: 20,
  },
};
