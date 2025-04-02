import { Size } from '@arco-design/web-vue';
export interface InputProps {
  modelValue?: string;
  defaultValue?: string;
  size?: Size;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  placeholder?: string;
  maxLength?: number;
  wordLength?: (value: string) => number;
  wordSlice?: (value: string, maxLength: number) => string;
  showWordLimit?: boolean;
  inputAttrs?: Record<string, any>;
  prefixText?: string;
}
