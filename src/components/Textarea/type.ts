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

// 内部使用
export type TextareaEvent = Event | MouseEvent | FocusEvent;

export type TextareaEventType = 'input' | 'change' | 'focus' | 'blur' | 'clear';
