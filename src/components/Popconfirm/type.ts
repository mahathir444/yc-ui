import { CSSProperties } from 'vue';
import { PopupContainer, TriggerPostion } from '../Trigger/type';
import { ButtonProps } from '@/components/Button/type';

// on-before-ok on-before-cancel
export interface PopconfirmProps {
  content?: string;
  position?: TriggerPostion;
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  type?: PopconfirmType;
  okText?: string;
  cancelText?: string;
  okLoading?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  contentClass?: string;
  contentStyle?: CSSProperties;
  arrowClass?: string;
  arrowStyle?: CSSProperties;
  popupContainer?: PopupContainer;
}

export type PopconfirmType = 'info' | 'success' | 'warning' | 'error';
