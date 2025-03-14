import { Ref } from 'vue';
import { TriggerType, PopupContainer } from '@/components/Trigger/type';
import { ButtonProps, ButtonType } from '@/components/Button/type';
import { Fn, Size } from '../_type';
export interface DropdownProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerType;
  position?: 'top' | 'tr' | 'tl' | 'bottom' | 'br' | 'bl';
  popupContainer?: PopupContainer;
  hideOnSelect?: boolean;
}

export type DoptionValue = string | number | boolean;

export interface DoptionProps {
  value: DoptionValue;
  disabled?: boolean;
  isSubmenu?: boolean;
}

export interface DsubmenuProps {
  disabled?: boolean;
  trigger?: 'hover' | 'click';
  position?: 'rt' | 'lt';
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
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

export interface ProvideType {
  level: number;
  curLevel: Ref<number>;
  groupIds: Ref<string[]>;
  hideOnSelect: Ref<boolean>;
  emits: Fn;
  hide: Fn;
}
