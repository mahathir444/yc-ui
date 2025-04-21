import { CSSProperties } from 'vue';
import { PopupContainer } from '@shared/type';
import { TriggerPostion, TriggerType } from '@/components/Trigger';

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
