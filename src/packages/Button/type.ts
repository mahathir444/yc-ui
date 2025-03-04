import { Size } from '../_type';
// status
export type ButtonStatus = 'normal' | 'warning' | 'success' | 'danger';
// shape
export type ButtonShape = 'square' | 'circle' | 'round';
// type
export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'dashed'
  | 'outline'
  | 'text';
// htmltype
export type ButtonHtmlType = 'button' | 'reset' | 'submit';
// herf
export interface ButtonProps {
  type?: ButtonType;
  shape?: ButtonShape;
  status?: ButtonStatus;
  size?: Size;
  long?: boolean;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: ButtonHtmlType;
}
