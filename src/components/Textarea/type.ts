import { Size } from '@/components/_type';
import { ButtonProps } from '../Button/type';
// wordSlice,wordLength
export interface TextareaProps {
  modelValue?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  showWordLimit?: boolean;
  allowClear?: boolean;
  readonly?: boolean;
  autoSize?: TextareaResize;
}

export interface ResizeRange {
  minRows?: number;
  maxRows?: number;
}

export type TextareaResize = boolean | ResizeRange;
