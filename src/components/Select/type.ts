import { WritableComputedRef, Ref } from 'vue';
import { Fn, Size } from '../_type';
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
  formatLabel?: (data: SelectOptionData[]) => string;
  // fallback-option
  // show-extra-options
  // value-key
  searchDelay?: number;
  limit?: number;
  // field-names
  // scrollbar
  showHeaderOnEmpty?: boolean;
  showFooterOnEmpty?: boolean;
  // tag-nowrap
}

export interface ProvideType {
  computedValue:
    | WritableComputedRef<SelectValue | SelectValue[]>
    | Ref<undefined>;
  computedInputValue: WritableComputedRef<string> | Ref<string>;
  computedVisible: WritableComputedRef<boolean> | Ref<boolean>;
  optionList: Ref<OptionProps[]>;
  limit: Ref<number>;
  multiple: Ref<boolean>;
  filterOption: Fn;
  emits: Fn;
}
