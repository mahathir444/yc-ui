import { Size } from '@/packages/_type';
import { ButtonProps } from '../Button/type';
// wordSlice,wordLength
export interface TextareaProps {
  modelValue?: string;
  defaultValue?: string;
  size?: Size;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  placeholder?: string;
  maxLength?: number;
  showWordLimit?: boolean;
}
