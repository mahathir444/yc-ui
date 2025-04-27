import { PopupContainer } from '@shared/type';
import { TriggerType } from '@/components/Trigger';
import { ButtonProps, ButtonType } from '@/components/Button';
import { Size } from '@shared/type';
import { CSSProperties } from 'vue';
export interface DropdownProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerType;
  position?: 'top' | 'tr' | 'tl' | 'bottom' | 'br' | 'bl';
  popupContainer?: PopupContainer;
  hideOnSelect?: boolean;
}

export interface DropdownEmits {
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'select', value: DoptionValue, ev: MouseEvent): void;
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
  optionStyle?: CSSProperties;
  popupMaxHeight?: number;
}

export interface DsubmenuEmits {
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
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
export interface DropdownProvide {
  select: (value: DoptionValue, ev: MouseEvent) => void;
}
