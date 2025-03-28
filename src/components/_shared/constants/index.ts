import {
  IconInfo,
  IconWarning,
  IconError,
  IconSuccess,
  IconLoading,
} from '@shared/icons';

// 类型到高度的映射
export const SIZE_MAP = {
  mini: 24,
  small: 28,
  medium: 32,
  large: 36,
};

// icon映射
export const TYPE_ICON_MAP: Record<string, any> = {
  success: IconSuccess,
  warning: IconWarning,
  error: IconError,
  info: IconInfo,
  loading: IconLoading,
};

// provide-keys
export const BUTTON_GROUP_PROVIDE_KEY = 'button-group-props';
export const CHECKBOX_GROUP_PROVIDE_KEY = 'checkbox-group-props';
export const RADIO_GROUP_PROVIDE_KEY = 'radio-group-props';
export const SELECT_PROVIDE_KEY = 'select-props';
export const DROPDOWN_PROVIDE_KEY = 'dropdown-props';
export const SCROLLBAR_PROVIDE_KEY = 'scrollbar-props';
export const TRIGGER_PROVIDE_KEY = 'trigger-props';
export const OVERFLOW_LIST_PROVIDE_KEY = 'overlist-props';
