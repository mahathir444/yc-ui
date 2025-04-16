import { Ref, WritableComputedRef } from 'vue';
import { Direction } from '@shared/type';

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
  formatTooltip?: FormatTooltip;
}

export type SliderValue = number | number[];

export type FormatTooltip = (value: number) => string;

export interface PositionData {
  left: number;
  right: number;
  top: number;
  bottom: number;
  transform?: string;
}

export interface RangeData {
  minLeft: number;
  maxLeft: number;
  minTop: number;
  maxTop: number;
}

// 内部使用
export interface SliderProvide {
  startValue: WritableComputedRef<number> | Ref<number>;
  endValue: WritableComputedRef<number> | Ref<number>;
  tempStartValue: Ref<number>;
  tempEndValue: Ref<number>;
  range: Ref<boolean>;
  min: Ref<number>;
  max: Ref<number>;
  step: Ref<number>;
  direction: Ref<Direction>;
  showTooltip: Ref<boolean>;
  disabled: Ref<boolean>;
  trackRef: Ref<HTMLDivElement | undefined>;
  formatTooltip?: FormatTooltip;
}
