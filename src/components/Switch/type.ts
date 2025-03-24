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
}

export type SwitchValue = string | number | boolean;
export type SwitchType = 'circle' | 'round' | 'line';
export type SwitchSize = 'small' | 'medium';
