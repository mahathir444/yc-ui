import { Direction, Size, ObjectData } from '@shared/type';

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

export interface RadioSlots {
  default(): void;
  radio(params: { checked: boolean; disabled: boolean }): void;
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

export interface RadioGroupSlots {
  default(): void;
  radio(params: { checked: boolean; disabled: boolean }): void;
  label(data: ObjectData): void;
}

export interface RadioOption {
  label?: string;
  value: RadioValue;
  disabled?: boolean;
}

export type RadioValue = string | number | boolean;

export type RadioType = 'radio' | 'button';
