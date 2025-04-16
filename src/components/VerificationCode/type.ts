import { VNode } from 'vue';
import { Fn, Size } from '../_shared/type';

export interface VerificationCodeProps {
  modelValue?: string;
  defaultValue?: string;
  length?: number;
  size?: Size;
  disabled?: boolean;
  masked?: boolean;
  readonly?: boolean;
  error?: boolean;
  separator?: (index: number, character: string) => VNode;
  formatter?: (
    inputValue: string,
    index: number,
    value: string
  ) => string | boolean;
}
