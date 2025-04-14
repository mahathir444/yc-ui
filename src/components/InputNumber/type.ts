import { Size, ObjectData } from '@shared/type';
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
  formatter?: (value: string) => string;
  parser?: (value: string) => string;
  readonly?: boolean;
  inputAttrs?: ObjectData;
}

export type InputNumberValue = number | string;

export type InputNumberMode = 'embed' | 'button';

export type ModelEvent = 'change' | 'input';
