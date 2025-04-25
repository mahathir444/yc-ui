import { WordLength, WordSlice, MaxLength } from '../Input';
import { RequiredDeep } from '@shared/type';
export interface TextareaProps {
  modelValue?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  maxLength?: MaxLength;
  showWordLimit?: boolean;
  allowClear?: boolean;
  readonly?: boolean;
  autoSize?: TextareaResize;
  wordLength?: WordLength;
  wordSlice?: WordSlice;
  // 是否阻止enter的默认行为
  enterPrevent?: boolean;
  showMirror?: boolean;
}

export type TextareaPropsRequired = RequiredDeep<TextareaProps>;

export interface TextareaEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'keydown', ev: KeyboardEvent): void;
}

export interface ResizeRange {
  minRows?: number;
  maxRows?: number;
}

export type TextareaResize = boolean | ResizeRange;
