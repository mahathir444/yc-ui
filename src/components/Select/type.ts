import { Size } from '../_type';

export type SelectValue = string | number | boolean;

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

export interface OptionProps {
  value?: SelectValue;
  label?: string;
  disabled?: boolean;
  index?: number;
}
