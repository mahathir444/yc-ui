import { Direction } from '@shared/type';
export interface SplitProps {
  component?: string;
  direction?: Direction;
  size?: number;
  defaultSize?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
}
