import { WordLength, WordSlice } from '../Input';
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
  wordLength?: WordLength;
  wordSlice?: WordSlice;
  // 是否阻止enter的默认行为
  enterPrevent?: boolean;
  showMirror?: boolean;
}

export interface ResizeRange {
  minRows?: number;
  maxRows?: number;
}

export type TextareaResize = boolean | ResizeRange;

// 内部使用
export type TextareaEvent = Event | MouseEvent | FocusEvent;

export type TextareaEventType = 'input' | 'change' | 'focus' | 'blur' | 'clear';
