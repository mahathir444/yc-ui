import { CSSProperties } from 'vue';
import { TriggerPostion, PopupContainer } from '../Trigger/type';

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
}
