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

export interface TransferItem {
  label?: string;
  value?: string;
  disabled?: boolean;
}
