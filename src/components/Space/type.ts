import { Direction, Size } from '@shared/type';
export interface SpaceProps {
  align?: 'start' | 'end' | 'center' | 'baseline';
  direction?: Direction;
  wrap?: boolean;
  fill?: boolean;
  size?: Size | number;
}

export interface SpaceSlots {
  default(): void;
  split(): void;
}
