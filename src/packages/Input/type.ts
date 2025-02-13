import { ComptSize } from '@/type';
// wordSlice
export interface InputProps {
  modelValue?: string;
  defaultValue?: string;
  size?: ComptSize;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  placeholder?: string;
  maxLength?: number;
  wordLength?: (value: string) => number;
  showWordLimit?: boolean;
  inputAttrs?: Record<string, any>;
}
