import { WritableComputedRef, Ref } from 'vue';
import { Direction } from '@/components/_type';
export type CheckboxValue = string | number | boolean;

export interface CheckboxProps {
  modelValue?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: CheckboxValue;
  indeterminate?: boolean;
}

export interface CheckboxOption {
  label?: string;
  value: CheckboxValue;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxGroupProps {
  modelValue?: CheckboxValue[];
  defaultValue?: CheckboxValue[];
  max?: number;
  options?: CheckboxOption[];
  direction?: Direction;
  disabled?: boolean;
}

export interface ProvideType {
  computedValue: WritableComputedRef<CheckboxValue[]> | Ref<undefined>;
  max: Ref<number | undefined>;
  disabled: Ref<boolean>;
}
