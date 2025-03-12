import { Size } from '../_type';
import { TriggerProps } from '../Trigger';
import { PopupContainer } from '../Trigger/type';

export type SelectValue = string | number | boolean;

export interface OptionProps {
  label: string;
  value: SelectValue;
  disabled?: boolean;
}

export interface OptgroupProps {
  label?: string;
}

export type SelectOptionData = OptionProps;

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
  filterOption?: (inputValue: string, option: SelectOptionData) => boolean;
  options?: SelectOptionData[];
  // virtual-list-props
  triggerProps?: TriggerProps;
  formatLabel?: (data: SelectOptionData) => string;
  // fallback-option
  // show-extra-options
  // value-key
  searchDelay?: number;
  // limit
  // field-names
  // scrollbar
  showHeaderOnEmpty?: boolean;
  showFooterOnEmpty?: boolean;
  // tag-nowrap
}
