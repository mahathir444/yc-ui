import { ObjectData, Size } from '@/components/_type';
import { ButtonProps } from '../Button/type';
// wordSlice,wordLength
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
  showWordLimit?: boolean;
  inputAttrs?: ObjectData;
  type?: 'password' | 'text';
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

export type InputEventType =
  | 'input'
  | 'change'
  | 'clear'
  | 'focus'
  | 'blur'
  | 'pressEnter';

export type InputEvent = Event | MouseEvent | FocusEvent;
