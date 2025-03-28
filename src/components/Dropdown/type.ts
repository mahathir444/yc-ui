import { Ref } from 'vue';
import { TriggerType, PopupContainer } from '@/components/Trigger';
import { ButtonProps, ButtonType } from '@/components/Button';
import { Fn, Size } from '@shared/type';
export interface DropdownProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerType;
  position?: 'top' | 'tr' | 'tl' | 'bottom' | 'br' | 'bl';
  popupContainer?: PopupContainer;
  hideOnSelect?: boolean;
}

export interface DoptionProps {
  value?: DoptionValue;
  disabled?: boolean;
  isSubmenu?: boolean;
}

export interface DsubmenuProps {
  disabled?: boolean;
  trigger?: 'hover' | 'click';
  position?: 'rt' | 'lt';
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
}

export interface DgroupProps {
  title?: string;
}

export interface DropdownButtonProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerType;
  position?: 'top' | 'tr' | 'tl' | 'bottom' | 'br' | 'bl';
  popupContainer?: PopupContainer;
  disabled?: boolean;
  type?: ButtonType;
  size?: Size;
  buttonProps?: ButtonProps;
  hideOnSelect?: boolean;
}

export type DoptionValue = string | number | boolean;

// 内部使用
export interface ProvideType {
  select: Fn;
}
