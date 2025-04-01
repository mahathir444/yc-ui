import { CSSProperties } from 'vue';
import { ButtonProps } from '@arco-design/web-vue';

// simple
export interface ModalProps {
  visible?: boolean;
  defaultVisible?: boolean;
  width?: number;
  top?: number;
  mask?: boolean;
  title?: string;
  titleAlign?: 'start' | 'center';
  alignCenter?: boolean;
  unmountOnClose?: boolean;
  maskClosable?: boolean;
  hideCancel?: boolean;
  closable?: boolean;
  okText?: string;
  cancelText?: string;
  okLoading?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  footer?: boolean;
  renderToBody?: boolean;
  popupContainer?: string;
  maskStyle?: CSSProperties;
  modalClass?: string;
  modalStyle?: CSSProperties;
  escToClose?: boolean;
  draggable?: boolean;
  fullscreen?: boolean;
  maskAnimationName?: string;
  modalAnimationName?: string;
  bodyClass?: string;
  bodyStyle?: CSSProperties;
  hideTitle?: boolean;
  onBeforeCancel?: OnBeforeCancel;
  onBeforeOk?: OnBeforeOk;
}

export type OnBeforeOk = (
  done: (closed: boolean) => void
) => void | boolean | Promise<boolean | void>;

export type OnBeforeCancel = () => boolean;
