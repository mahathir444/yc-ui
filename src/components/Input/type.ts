import { ObjectData, Size } from '@/components/_type';
import { ButtonProps } from '../Button/type';
//
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
  // input-password使用
  type?: 'password' | 'text' | 'number' | 'digit';
  //select使用
  showInput?: boolean;
}

export interface InputPasswordProps {
  visibility?: boolean;
  defaultVisibility?: boolean;
  invisibleButton?: boolean;
}

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
  | 'pressEnter';

export type InputEvent = Event | MouseEvent | FocusEvent;
