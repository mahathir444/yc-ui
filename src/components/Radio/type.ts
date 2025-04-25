import { WritableComputedRef, Ref } from 'vue';
import { Direction, Size } from '@shared/type';

export interface RadioProps {
  modelValue?: RadioValue;
  defaultChecked?: boolean;
  value?: RadioValue;
  type?: RadioType;
  disabled?: boolean;
  preventFocus?: boolean;
}

export interface RadioEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean, ev: Event): void;
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

export interface RadioGroupEmits {
  (e: 'update:modelValue', value: RadioValue): void;
  (e: 'change', value: RadioValue, ev: Event): void;
}

export interface RadioOption {
  label?: string;
  value: RadioValue;
  disabled?: boolean;
}

export type RadioValue = string | number | boolean;

export type RadioType = 'radio' | 'button';

// 内部使用
export interface RadioProvide {
  computedValue: WritableComputedRef<RadioValue> | Ref<undefined>;
  type: Ref<RadioType>;
  disabled: Ref<boolean>;
  size: Ref<Size>;
}
