import { WritableComputedRef, Ref } from 'vue';
import { Fn, ObjectData, Size } from '@shared/type';
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
  virtualListProps?: VirtualListProps;
  triggerProps?: TriggerProps;
  formatLabel?: FormatLabel;
  fallbackOption?: FallbackOption;
  showExtraOptions?: boolean;
  valueKey?: string;
  searchDelay?: number;
  limit?: number;
  fieldNames?: Record<string, string>;
  scrollbar?: boolean;
  showHeaderOnEmpty?: boolean;
  showFooterOnEmpty?: boolean;
  tagNowrap?: boolean;
  // 是否开启快捷键
  hotkeys?: boolean;
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

export type FallbackOption = (value: SelectValue) => SelectOptionData;

export type FormatLabel = (data: SelectOptionData) => string;

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

export type VirtualListProps = {
  height: number;
  itemHeight: number;
  threshold?: number;
  buffer?: number;
};

// 内部使用
export interface ProvideType {
  computedValue:
    | WritableComputedRef<SelectValue | SelectValue[]>
    | Ref<undefined>;
  computedInputValue: WritableComputedRef<string> | Ref<string>;
  multiple: Ref<boolean>;
  limit: Ref<number>;
  curIndex: Ref<number>;
  options: Ref<SelectOptionData[]>;
  blur: Fn;
  filterOption: Fn;
  getValue: Fn;
  emits: Fn;
}

export type SelectEventType =
  | 'clear'
  | 'search'
  | 'updateValue'
  | 'blur'
  | 'focus'
  | 'click';
