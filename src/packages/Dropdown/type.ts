import { TriggerType, PopupContainer } from '@/packages/Trigger/type';
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
  stopPropagation?: boolean;
}

export interface DsubmenuProps {
  disabled?: boolean;
  trigger?: 'hover' | 'click';
  position?: 'rt' | 'lt';
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
}
