import { CSSProperties } from 'vue';
import { PopupContainer } from '@shared/type';
import { OnBeforeCancel, OnBeforeOk } from '@/components/Modal';
import { TriggerPostion, TriggerProps } from '@/components/Trigger';
import { ButtonProps } from '@/components/Button';

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
  triggerProps?: TriggerProps;
  onBeforeOk?: OnBeforeOk;
  onBeforeCancel?: OnBeforeCancel;
}

export interface PopconfirmEmits {
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel'): void;
}

export type PopconfirmType = 'info' | 'success' | 'warning' | 'error';
