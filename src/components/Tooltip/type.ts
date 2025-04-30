import { CSSProperties } from 'vue';
import { PopupContainer } from '@shared/type';
import { TriggerPostion, TriggerProps } from '@/components/Trigger/type';

export interface TooltipProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  content?: string;
  position?: TriggerPostion;
  mini?: boolean;
  backgroundColor?: string;
  contentClass?: string;
  contentStyle?: CSSProperties;
  arrowClass?: string;
  arrowStyle?: CSSProperties;
  popupContainer?: PopupContainer;
  triggerProps?: TriggerProps;
}

export interface TooltipEmits {
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
}
