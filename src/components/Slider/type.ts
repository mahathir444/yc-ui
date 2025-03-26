import { Direction } from '@shared/type';
export interface SliderProps {
  modelValue?: number;
  defaultValue?: number;
  step?: number;
  min?: number;
  marks?: Record<number, string>;
  max?: number;
  direction?: Direction;
  disabled?: boolean;
  showTicks?: boolean;
  showInput?: boolean;
  range?: boolean;
  showTooltip?: boolean;
}

export interface PositionData {
  left: string;
  right: string;
  top: string;
  bottom: string;
}

export interface RangeData {
  minLeft: number;
  maxLeft: number;
  minTop: number;
  maxTop: number;
}
