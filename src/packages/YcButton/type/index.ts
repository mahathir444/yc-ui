import { ComptSize } from '@/type';

export type ButtonStatus = 'normal' | 'warning' | 'success' | 'danger';

export type ButtonShape = 'square' | 'circle' | 'round';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'dashed'
  | 'outline'
  | 'text';

export type ButtonHtmlType = 'button' | 'reset' | 'submit';

// herf
export interface ButtonProps {
  type?: ButtonType;
  shape?: ButtonShape;
  status?: ButtonStatus;
  size?: ComptSize;
  long?: boolean;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: ButtonHtmlType;
}
