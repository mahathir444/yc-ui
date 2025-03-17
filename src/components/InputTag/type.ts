import { Size } from '@/components/_type';
import { TagProps } from '@/components/Tag';

export interface TagData {
  id?: string;
  label: string;
  value: string | number;
  closeable?: boolean;
  tagProps?: TagProps;
}

export type InputTagValue = (string | number | TagData)[];

export type RetainValue = { create?: boolean; blur?: boolean };

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
  maxTagCount?: number;
  retainInputValue?: boolean | RetainValue;
  formatTag?: (data: TagData) => string;
  uniqueValue?: boolean;
  tagNowrap?: boolean;
  enterToCreate?: boolean;
}
