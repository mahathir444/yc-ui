import { ObjectData, Size } from '@shared/type';
import { TagProps } from '@/components/Tag';

export interface InputTagProps {
  modelValue?: InputTagValue;
  defaultValue?: InputTagValue;
  inputValue?: string;
  defaultInputValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  readonly?: boolean;
  allowClear?: boolean;
  size?: Size;
  maxTagCount?: number;
  retainInputValue?: boolean | InputRetainValue;
  formatTag?: FormatTag;
  uniqueValue?: boolean;
  tagNowrap?: boolean;
  fieldNames?: Record<string, string>;
  allowCreate?: boolean;
}

export interface InputTagEmits {
  (e: 'update:modelValue', value: InputTagValue): void;
  (e: 'update:inputValue', value: string): void;
  (e: 'input', value: string): void;
  (e: 'inputValueChange', value: string, ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
  (e: 'remove', ev: MouseEvent | KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
}

export type TagData =
  | {
      id?: string;
      label: string;
      value: string | number;
      closeable?: boolean;
      tagProps?: TagProps;
    }
  | ObjectData;

export type InputTagValue = (string | number | TagData)[];

export type InputRetainValue = { create?: boolean; blur?: boolean };

export type FormatTag = (data: TagData) => string;
