import { Size } from '@/components/_type';
import { TagProps } from '@/components/Tag';

export interface TagData {
  label: string;
  value: string | number;
  closeable?: boolean;
  tagProps?: TagProps;
}

export type InputTagValue = (string | number | TagData)[];

// wordSlice,wordLength
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
  magTagCount?: number;
  enterToCreate?: boolean;
  formatTag?: (data: TagData) => string;
}
