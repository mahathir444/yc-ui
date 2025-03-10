import { CSSProperties } from 'vue';
import { TriggerPostion, TriggerType, PopupContainer } from '../Trigger/type';

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
}
