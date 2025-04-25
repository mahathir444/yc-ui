import { RESIZE_BOX_POSITION_MAP } from '@shared/constants';

export type DirectionType = (typeof RESIZE_BOX_POSITION_MAP)[number];

export interface ResizeBoxProps {
  directions?: DirectionType[];
  width?: number;
  height?: number;
  component?: string;
}

export interface ResizeBoxEmits {
  (event: 'update:width', val: number): void;
  (event: 'update:height', val: number): void;
  (event: 'moving-start', ev: MouseEvent): void;
  (event: 'moving-end', ev: MouseEvent): void;
  (
    event: 'moving',
    ev: MouseEvent,
    size: { width?: number; height?: number }
  ): void;
}
