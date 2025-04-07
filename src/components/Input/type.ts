import { ObjectData, Size } from '@shared/type';
import { ButtonProps } from '@/components/Button/type';
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
  wordLength?: WordLength;
  wordSlice?: WordSlice;
  showWordLimit?: boolean;
  inputAttrs?: ObjectData;
  append?: string;
  prepend?: string;
  type?: 'password' | 'search' | 'text';
  // password使用
  visibility?: boolean;
  defaultVisibility?: boolean;
  invisibleButton?: boolean;
  // search使用
  searchButton?: boolean;
  loading?: boolean;
  buttonText?: string;
  buttonProps?: ButtonProps;
  //select使用
  showInput?: boolean;
}

export interface InputPasswordProps {}

export interface InputSearchProps {
  searchButton?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: Size;
  buttonText?: string;
  buttonProps?: ButtonProps;
}

export type WordSlice = (value: string, maxLength: number) => string;

export type WordLength = (value: string) => number;

// 内部使用
export type InputEventType =
  | 'input'
  | 'change'
  | 'clear'
  | 'focus'
  | 'blur'
  | 'keydown';

export type InputEvent = Event | MouseEvent | FocusEvent;
