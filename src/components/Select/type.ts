import { WritableComputedRef, Ref } from 'vue';
import { Fn, ObjectData, Size } from '../_type';
import { TriggerProps } from '../Trigger';
import { PopupContainer } from '../Trigger/type';
import { TagProps } from '../Tag';

export interface SelectProps {
  multiple?: boolean;
  modelValue?: SelectValue;
  defaultValue?: SelectValue;
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
  maxTagCount?: number;
  popupContainer?: PopupContainer;
  bordered?: boolean;
  defaultActivefirstOption?: boolean;
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  unmountonClose?: boolean;
  filterOption?: FilterOption;
  options?: SelectOptions;
  // virtual-list-props
  triggerProps?: TriggerProps;
  formatLabel?: (data: SelectOptionData) => string;
  // fallback-option
  // show-extra-options
  valueKey?: string;
  searchDelay?: number;
  limit?: number;
  fieldNames?: Record<string, string>;
  scrollbar?: boolean;
  showHeaderOnEmpty?: boolean;
  showFooterOnEmpty?: boolean;
  tagNowrap?: boolean;
  // 以下用于autoComplete
  isAutoCompleteMode?: boolean;
}

export interface OptionProps {
  id?: string;
  label: string;
  value: SelectValue;
  disabled?: boolean;
  tagProps?: TagProps;
}

export interface OptgroupProps {
  label?: string;
}

export type SelectValue =
  | (string | number | boolean | ObjectData)
  | (string | number | boolean | ObjectData)[];

export type FilterOption = (
  inputValue: string,
  option: SelectOptionData
) => boolean;

export type SelectOptionData = OptionProps | ObjectData;

export type SelectOptionGroup = {
  id?: string;
  label: string;
  isGroup: true;
  options: SelectOptionData[];
};

export type SelectOptions =
  | SelectOptionData[]
  | SelectOptionGroup[]
  | ObjectData[];

export interface ProvideType {
  computedValue:
    | WritableComputedRef<SelectValue | SelectValue[]>
    | Ref<undefined>;
  computedInputValue: WritableComputedRef<string> | Ref<string>;
  computedVisible: WritableComputedRef<boolean> | Ref<boolean>;
  limit: Ref<number>;
  multiple: Ref<boolean>;
  focus: Fn;
  filterOption: Fn;
  emits: Fn;
  getValue: Fn;
}

// 内部使用
export type SelectEventType = 'clear' | 'search' | 'blur';
