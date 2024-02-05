import { useWindowTypes } from 'hooks';
import { CSSProperties } from 'react';
import { Media } from 'types';
import { MediaRowProps } from './Row';

export const useRowStyles = (media: Media<MediaRowProps>): CSSProperties => {
  const windowType = useWindowTypes();
  const currentMedia = media[windowType];
  return {
    gridTemplateColumns: `repeat(${currentMedia.columns}, 1fr)`,
    gap: `${currentMedia.gap}px`,
  };
};
