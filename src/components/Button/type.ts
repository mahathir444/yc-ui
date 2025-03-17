import { Ref } from 'vue';
import { Size } from '@/components/_type';

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

export interface ButtonGroupProps {
  type?: ButtonType;
  status?: ButtonStatus;
  shape?: ButtonShape;
  size?: Size;
  disabled?: boolean;
}

export interface ProvideType {
  type: Ref<ButtonType>;
  status: Ref<ButtonStatus>;
  size: Ref<Size>;
  shape: Ref<ButtonShape>;
  disabled: Ref<boolean>;
}

export type ButtonEvent = MouseEvent;
export type ButtonEventType = 'click' | 'dblclick' | 'contextmenu';
