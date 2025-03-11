import { Size } from '../_type';

export type SelectValue = string | number | boolean;

export interface SelectOptionProps {
  value?: SelectValue;
  label?: string;
  disabled?: boolean;
  index?: number;
}

export interface SelectProps {
  multiple?: boolean;
  modelValue?: SelectValue | SelectValue[];
  defaultValue?: SelectValue | SelectValue[];
  inputValue?: string;
  defaultInputValue?: string;
  size?: Size;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  error?: boolean;
  allowClear?: boolean;
  allowSearch?: boolean;
  allowCreate?: boolean;
}
