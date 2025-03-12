import { Size } from '../_type';
import { TriggerProps } from '../Trigger';
import { PopupContainer } from '../Trigger/type';

export type SelectValue = string | number | boolean;

export interface SelectProps {
  // multiple?: boolean;
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
  // maxTagCount: number;
  popupContainer?: PopupContainer;
  // bordered?: boolean;
  defaultActivefirstOption?: boolean;
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  unmountonClose?: boolean;
  // filterOption?: boolean | (inputValue: string, option: SelectOptionData) => boolean;
  options?: SelectOptionData[];
  triggerProps: TriggerProps;
}

export interface OptionProps {
  label: string;
  value: SelectValue;
  disabled?: boolean;
  index?: number;
}

export type SelectOptionData = Omit<OptionProps, 'index'>;
