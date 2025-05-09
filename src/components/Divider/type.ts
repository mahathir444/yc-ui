import { Direction } from '@shared/type';
export interface DividerProps {
  direction?: Direction;
  orientation?: 'left' | 'center' | 'right';
  type?: 'solid' | 'dashed' | 'dotted' | 'double';
  size?: number;
  margin?: number;
}

export interface DividerSlots {
  default(): void;
}
