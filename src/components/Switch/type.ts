import { SelectValue } from '../Select';

export interface SwitchProps {
  modelValue?: SwitchValue;
  defaultValue?: SwitchValue;
  disabled?: boolean;
  loading?: boolean;
  type?: SwitchType;
  size?: SwitchSize;
  checkedValue?: SwitchValue;
  uncheckedValue?: SwitchValue;
  checkedColor?: string;
  uncheckedColor?: string;
  checkedText?: string;
  uncheckedText?: string;
  beforeChange?: (
    newValue: SelectValue
  ) => Promise<boolean | void> | boolean | void;
}

export interface SwitchEmits {
  (e: 'update:modelValue', value: SwitchValue): void;
  (e: 'change', value: SwitchValue, ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}

export interface SwitchSlots {
  ['checked-icon'](): void;
  ['unchecked-icon'](): void;
  ['checked'](): void;
  ['unchecked'](): void;
}

export type SwitchValue = string | number | boolean;
export type SwitchType = 'circle' | 'round' | 'line';
export type SwitchSize = 'small' | 'medium';
