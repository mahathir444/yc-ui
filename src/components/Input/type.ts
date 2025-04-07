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
  // password使用
  isPassword?: boolean;
  visibility?: boolean;
  defaultVisibility?: boolean;
  invisibleButton?: boolean;
  // search使用
  isSearch?: boolean;
  searchButton?: boolean;
  loading?: boolean;
  buttonText?: string;
  buttonProps?: ButtonProps;
  //select使用
  showInput?: boolean;
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
