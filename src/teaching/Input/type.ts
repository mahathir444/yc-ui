import { ObjectData, Size } from '@shared/type';
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
}

export type WordSlice = (value: string, maxLength: number) => string;

export type WordLength = (value: string) => number;
