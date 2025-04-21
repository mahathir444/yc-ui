import { CSSProperties } from 'vue';
import { ButtonProps } from '@/components/Button/type';
import { RenderContent, PopupContainer } from '@shared/type';

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
  popupContainer?: PopupContainer;
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
  simple?: boolean;
  onBeforeCancel?: OnBeforeCancel;
  onBeforeOk?: OnBeforeOk;
}

export type ModalConfig = Omit<ModalProps, 'visible' | 'defaultVisible'> & {
  title?: RenderContent;
  content: RenderContent;
  type?: ModalType;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onOpen?: () => void;
  onClose?: () => void;
  onBeforeOpen?: () => void;
  onBeforeClose?: () => void;
};

export type OnBeforeOk = (
  done: (closed: boolean) => void
) => void | boolean | Promise<boolean | void>;

export type OnBeforeCancel = () => boolean;

export type ModalType = 'info' | 'warning' | 'error' | 'success';

export type ModalMethod = (props: ModalConfig) => { close: () => void };

export type ModalMethods = {
  success: ModalMethod;
  error: ModalMethod;
  warning: ModalMethod;
  info: ModalMethod;
};

// 内部使用
export type ModalServiceData = { id: string; container: HTMLDivElement | null };
