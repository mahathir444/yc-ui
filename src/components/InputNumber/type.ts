import { Fn, Size, ObjectData } from '@/components/_/type';
// formatter?: Fn;
// parser?: Fn;
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
  placeholder?: string;
  hideButton?: boolean;
  size?: Size;
  allowClear?: boolean;
  modelEvent?: ModelEvent;
  readonly?: boolean;
  inputAttrs?: ObjectData;
}

export type InputNumberValue = number | string;

export type InputNumberMode = 'embed' | 'button';

export type ModelEvent = 'change' | 'input';
