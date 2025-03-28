import { SelectOptions } from '@/components/Select';
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
