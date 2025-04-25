import { Ref, WritableComputedRef } from 'vue';
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

export interface TransferProvide {
  computedValue: WritableComputedRef<string[]> | Ref<string[]>;
  computedSelected: WritableComputedRef<string[]> | Ref<string[]>;
  targetChecked: Ref<string[]>;
  sourceChecked: Ref<string[]>;
  sourceOptions: Ref<TransferItem[]>;
  targetOptions: Ref<TransferItem[]>;
  showSelectAll: Ref<boolean>;
  disabled: Ref<boolean>;
  title: Ref<string[]>;
  sourceInputSearchProps: Ref<InputProps>;
  targetInputSearchProps: Ref<InputProps>;
  showSearch: Ref<boolean>;
  oneWay: Ref<boolean>;
  simple: Ref<boolean>;
  emits: any;
}
