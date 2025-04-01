import { Fn, ObjectData, Size, PopupContainer } from '../_shared/type';
import {
  TriggerProps,
  TagProps,
  SelectOptionData,
  SelectOptionGroup,
} from '@arco-design/web-vue';

export interface SelectProps {
  prefixText?: string;
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

export type SelectOptions = (
  | string
  | number
  | boolean
  | SelectOptionData
  | SelectOptionGroup
)[];

export type VirtualListProps = {
  height: number;
  itemHeight: number;
  threshold?: number;
  buffer?: number;
};
