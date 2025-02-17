import { ComptSize } from '@/type';
import { ButtonProps } from '../Button/type';
// wordSlice,wordLength
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
  showWordLimit?: boolean;
  inputAttrs?: Record<string, any>;
  type?: 'password' | 'text';
}

export interface InputPassword extends InputProps {
  visibility?: boolean;
  defaultVisibility?: boolean;
  invisibleButton?: boolean;
}

export interface InputSearch extends InputProps {
  searchButton?: boolean;
  loading?: boolean;
  buttonText?: string;
  buttonProps?: ButtonProps;
}
