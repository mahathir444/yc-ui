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
  separator?: Fn;
  formatter?: Fn;
}
