export interface RadioProps {
  modelValue?: RadioValue;
  defaultChecked?: boolean;
  value?: RadioValue;
  type?: RadioType;
  disabled?: boolean;
}

export type RadioValue = string | number | boolean;

export type RadioType = 'radio' | 'button';
