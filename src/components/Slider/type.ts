import { Ref, WritableComputedRef } from 'vue';
import { Direction } from '@shared/type';
import { SelectOptions } from '../Select';

export interface SliderProps {
  modelValue?: SliderValue;
  defaultValue?: SliderValue;
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

export type SliderValue = number | number[];

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

// 内部使用
export interface ProvideType {
  step: Ref<number>;
  min: Ref<number>;
  max: Ref<number>;
  showTooltip: Ref<boolean>;
  disabled: Ref<boolean>;
  direction: Ref<Direction>;
  trackRef: Ref<HTMLDivElement | undefined>;
  startValue: WritableComputedRef<number> | Ref<number>;
  endValue: WritableComputedRef<number> | Ref<number>;
  computedValue: WritableComputedRef<SliderValue> | Ref<SliderValue>;
}
