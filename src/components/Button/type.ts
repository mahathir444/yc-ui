import { Ref } from 'vue';
import { Size } from '@shared/type';

export interface ButtonProps {
  type?: ButtonType;
  shape?: ButtonShape;
  status?: ButtonStatus;
  size?: Size;
  long?: boolean;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: ButtonHtmlType;
  href?: string;
}

export interface ButtonGroupProps {
  type?: ButtonType;
  status?: ButtonStatus;
  shape?: ButtonShape;
  size?: Size;
  disabled?: boolean;
}

export type ButtonStatus = 'normal' | 'warning' | 'success' | 'danger';

export type ButtonShape = 'square' | 'circle' | 'round';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'dashed'
  | 'outline'
  | 'text';

export type ButtonHtmlType = 'button' | 'reset' | 'submit';

// 内部使用
export type ButtonEvent = MouseEvent;

export type ButtonEventType =
  | 'click'
  | 'dblclick'
  | 'contextmenu'
  | 'mousedown'
  | 'mouseup';

export interface ButtonProvide {
  type: Ref<ButtonType>;
  status: Ref<ButtonStatus>;
  size: Ref<Size>;
  shape: Ref<ButtonShape>;
  disabled: Ref<boolean>;
}
