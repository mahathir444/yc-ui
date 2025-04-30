import { CSSProperties } from 'vue';
import { PopupContainer } from '@shared/type';
import {
  TriggerPostion,
  TriggerProps,
  TriggerType,
} from '@/components/Trigger';

export interface PopoverProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  title?: string;
  content?: string;
  trigger?: TriggerType;
  position?: TriggerPostion;
  contentClass?: string;
  contentStyle?: CSSProperties;
  arrowClass?: string;
  arrowStyle?: CSSProperties;
  popupContainer?: PopupContainer;
  triggerProps?: TriggerProps;
}

export interface PopoverEmits {
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
}
