import { WritableComputedRef, Ref } from 'vue';
import { Direction, Size } from '../_type';

export interface RadioProps {
  modelValue?: RadioValue;
  defaultChecked?: boolean;
  value?: RadioValue;
  type?: RadioType;
  disabled?: boolean;
}

export interface RadioGroupProps {
  modelValue?: RadioValue;
  defaultValue?: RadioValue;
  size?: Size;
  type?: RadioType;
  options?: RadioOption[];
  direction?: Direction;
  disabled?: boolean;
}

export interface RadioOption {
  label?: string;
  value: RadioValue;
  disabled?: boolean;
}

export type RadioValue = string | number | boolean;

export type RadioType = 'radio' | 'button';

// 内部使用
export interface ProvideType {
  computedValue: WritableComputedRef<RadioValue> | Ref<undefined>;
  type: Ref<RadioType>;
  disabled: Ref<boolean>;
}
