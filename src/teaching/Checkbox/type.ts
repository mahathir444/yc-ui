export interface CheckboxProps {
  modelValue?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: CheckboxValue;
  indeterminate?: boolean;
}

export type CheckboxValue = string | number | boolean;
