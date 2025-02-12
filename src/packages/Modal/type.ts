import { CSSProperties } from 'vue';
import { ButtonProps } from '@/packages/Button/type';

// default-visible simple on-before-ok on-before-cancel
export interface ModalProps {
  visible?: boolean;
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
}

export interface ModalConfig extends Omit<ModalProps, 'visible'> {
  content?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onOpen?: () => void;
  onClose?: () => void;
  onBeforeOpen?: () => void;
  onBeforeClose?: () => void;
}
