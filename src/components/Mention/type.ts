import { SelectOptions, SelectValue } from '@/components/Select';

export interface MentionProps {
  modelValue?: string;
  defaultValue?: string;
  data?: SelectOptions;
  prefix?: string | string[];
  split?: string;
  type?: 'input' | 'textarea';
  disabled?: boolean;
  allowClear?: boolean;
}

export interface MentionEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'search', value: string): void;
  (e: 'select', value: SelectValue): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'input', value: string, ev: Event): void;
}
