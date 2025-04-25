import { Size, RequiredDeep } from '@shared/type';
import { ButtonProps } from '@/components/Button';

export interface InputProps {
  modelValue?: string;
  defaultValue?: string;
  size?: Size;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  placeholder?: string;
  maxLength?: MaxLength;
  wordLength?: WordLength;
  wordSlice?: WordSlice;
  showWordLimit?: boolean;
  inputAttrs?: Record<string, any>;
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

export type InputPropsRequired = RequiredDeep<InputProps>;

export type InputEmits = {
  (e: 'update:modelValue', value: string): void;
  (e: 'update:visibility', value: boolean): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'visibilityChange', value: boolean): void;
  (e: 'search', value: string): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
  (e: 'keydown', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
};

export type WordSlice = (value: string, maxLength: number) => string;

export type WordLength = (value: string) => number;

export type MaxLength = number | { length: number; errorOnly?: boolean };

// 内部使用
export interface InputProvide {
  props?: InputPropsRequired;
  emits: InputEmits;
}
