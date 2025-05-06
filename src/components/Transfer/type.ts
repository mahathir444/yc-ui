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
  (e: 'update:selected', value: string[]): void;
  (e: 'update:modelValue', value: string[]): void;
  (e: 'change', value: string[]): void;
  (e: 'select', value: string[]): void;
  (e: 'search', value: string, type: 'target' | 'source'): void;
}

export interface TransferSlots {
  source(params: { data: TransferItem[]; selectedKeys: string[] }): void;
  target(params: { data: TransferItem[]; selectedKeys: string[] }): void;
  ['source-title'](params: {
    countTotal: number;
    countSelected: number;
    searchValue: string;
    checked: boolean;
    indeterminate: boolean;
  }): void;
  ['target-title'](params: {
    countTotal: number;
    countSelected: number;
    searchValue: string;
    checked: boolean;
    indeterminate: boolean;
  }): void;
  ['to-source-icon'](): void;
  ['to-target-icon'](): void;
  item(value: string, label: string): void;
}

export interface TransferItem {
  label?: string;
  value?: string;
  disabled?: boolean;
}
