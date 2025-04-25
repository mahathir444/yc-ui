import { WritableComputedRef, Ref } from 'vue';
import { Direction } from '@shared/type';

export interface CheckboxProps {
  modelValue?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: CheckboxValue;
  indeterminate?: boolean;
  preventFocus?: boolean;
}

export interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean, ev: Event): void;
}

export interface CheckboxGroupProps {
  modelValue?: CheckboxValue[];
  defaultValue?: CheckboxValue[];
  max?: number;
  options?: CheckboxOption[];
  direction?: Direction;
  disabled?: boolean;
}

export interface CheckboxGroupEmits {
  (e: 'update:modelValue', value: CheckboxValue[]): void;
  (e: 'change', value: CheckboxValue[], ev: Event): void;
}

export interface CheckboxOption {
  label?: string;
  value: CheckboxValue;
  disabled?: boolean;
  indeterminate?: boolean;
}

export type CheckboxValue = string | number | boolean;

// 内部使用
export interface CheckboxProvide {
  computedValue: WritableComputedRef<CheckboxValue[]> | Ref<undefined>;
  max: Ref<number | undefined>;
  disabled: Ref<boolean>;
}
