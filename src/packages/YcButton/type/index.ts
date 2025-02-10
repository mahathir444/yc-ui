import { ComptSize } from '@/type';
export type YcButtonStatus = 'normal' | 'warning' | 'success' | 'danger';
export type YcButtonShape = 'square' | 'circle' | 'round';
export type YcButtonType =
  | 'primary'
  | 'secondary'
  | 'dashed'
  | 'outline'
  | 'text';

export interface YcButtonProps {
  type?: YcButtonType;
  shape?: YcButtonShape;
  status?: YcButtonStatus;
  size?: ComptSize;
  long?: boolean;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: 'button' | 'reset' | 'submit';
}
