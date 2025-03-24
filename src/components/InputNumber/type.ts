import { Fn, Size, ObjectData } from '@/components/_type';
export interface InputNumberProps {
  modelValue?: InputNumberValue;
  defaultValue?: InputNumberValue;
  mode?: InputNumberMode;
  precision?: number;
  step?: number;
  disabled?: boolean;
  error?: boolean;
  max?: number;
  min?: number;
  formatter?: Fn;
  parser?: Fn;
  placeholder?: string;
  hideButton?: boolean;
  size?: Size;
  allowClear?: boolean;
  modelEvent?: 'change' | 'input';
  readonly?: boolean;
  inputAttrs?: ObjectData;
}

export type InputNumberValue = number | string;

export type InputNumberMode = 'embed' | 'button';
