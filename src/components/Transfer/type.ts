import { InputProps } from '@/components/Input';

export interface TransferProps {
  data?: TransferItem[];
  modelValue?: string[];
  defaultValue?: string[];
  selected?: string[];
  defaultSelected?: string[];
  disabled?: boolean;
  simple?: boolean;
  oneWay?: boolean;
  showSearch?: boolean;
  showSelectAll?: boolean;
  title?: string[];
  sourceInputSearchProps?: InputProps;
  targetInputSearchProps?: InputProps;
}

export interface TransferEmits {
  (e: 'update:selected', value: TransferItemValue[]): void;
  (e: 'update:modelValue', value: TransferItemValue[]): void;
  (e: 'change', value: TransferItemValue[]): void;
  (e: 'select', value: TransferItemValue[]): void;
  (e: 'search', value: string, type: 'target' | 'source'): void;
}

export interface TransferSlots {
  source(params: DefaultSlots): void;
  target(params: DefaultSlots): void;
  ['source-title'](params: TitleSlots): void;
  ['target-title'](params: TitleSlots): void;
  ['to-source-icon'](): void;
  ['to-target-icon'](): void;
  item(params: { value: string; label: string }): void;
}

export interface TransferPanelSlots {
  default(params: DefaultSlots): void;
  ['title'](params: TitleSlots): void;
  item(params: { value: string; label: string }): void;
}

export interface TransferItem {
  label?: string;
  value?: TransferItemValue;
  disabled?: boolean;
}

export type TransferItemValue = string | number;

type TitleSlots = {
  countTotal: number;
  countSelected: number;
  searchValue: string;
  checked: boolean;
  indeterminate: boolean;
  onSelectAllChange: (checked: boolean) => void;
  onClear: () => void;
};

type DefaultSlots = {
  data: TransferItem[];
  selectedKeys: string[];
  onSelect: (value: TransferItemValue[]) => void;
};
