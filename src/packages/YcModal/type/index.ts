import { YcButtonProps } from '@/packages/YcButton/type';
import { CSSProperties } from 'vue';

// default-visible simple on-before-ok on-before-cancel
export interface YcModalProps {
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
  okButtonProps?: YcButtonProps;
  cancelButtonProps?: YcButtonProps;
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
