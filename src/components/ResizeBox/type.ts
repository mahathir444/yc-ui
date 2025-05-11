export type DirectionType = 'left' | 'right' | 'top' | 'bottom';

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

export interface ResizeBoxSlots {
  default(): void;
  ['resize-trigger'](params: { direction: DirectionType }): void;
  ['resize-trigger-icon'](params: { direction: DirectionType }): void;
}
