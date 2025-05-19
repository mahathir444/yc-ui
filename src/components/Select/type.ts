import { ObjectData, RenderContent, Size, PopupContainer } from '@shared/type';
import { TriggerInstance, TriggerProps } from '../Trigger';
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

export interface SelectEmits {
  (e: 'update:modelValue', value: SelectValue): void;
  (e: 'update:inputValue', value: SelectValue): void;
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'change', value: SelectValue): void;
  (e: 'input-value-change', value: string): void;
  (e: 'clear'): void;
  (e: 'remove'): void;
  (e: 'search', value: string): void;
  (e: 'exceedLimit', value: SelectValue, ev?: MouseEvent): void;
  (e: 'popupVisibleChange', value: boolean): void;
  (e: 'dropdownScroll'): void;
  (e: 'dropdownReachBottom'): void;
  (e: 'select', value: SelectValue): void;
}

export interface SelectSlots {
  default(): void;
  trigger(): void;
  prefix(): void;
  ['search-icon'](): void;
  ['loading-icon'](): void;
  ['arrow-icon'](): void;
  footer(): void;
  header(): void;
  label(data: ObjectData): void;
  option(data: ObjectData): void;
  empty(): void;
}

export type SelectExpose = {
  focus(): void;
  blur(): void;
  getPopupRef(): TriggerInstance;
};

export interface OptionProps {
  id?: string;
  label?: string;
  value?: SelectValue;
  disabled?: boolean;
  tagProps?: TagProps;
}

export interface OptgroupProps {
  label?: string;
}

export type SelectValue =
  | (string | number | boolean | ObjectData)
  | (string | number | boolean | ObjectData)[];

export type VirtualListProps = {
  itemHeight?: number;
  buffer?: number;
  threshold?: number;
};

export type SelectOptionData = { render?: RenderContent } & OptionProps;

export type SelectOptionGroup = {
  id?: string;
  label?: string;
  isGroup?: true;
  options?: SelectOptionData[];
};

export type SelectOptions = (
  | SelectOptionData
  | SelectOptionGroup
  | ObjectData
)[];

export type FilterOption = (
  inputValue: string,
  option: SelectOptionData
) => boolean;

export type FallbackOption = (value: SelectValue) => SelectOptionData;

export type FormatLabel = (data: SelectOptionData) => string;
