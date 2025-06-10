import { CSSProperties } from 'vue';
import { ButtonProps } from '@/components/Button';
import { RenderContent, PopupContainer, ClassName } from '@shared/type';

export interface ModalProps {
  visible?: boolean;
  defaultVisible?: boolean;
  width?: number | string;
  top?: number;
  mask?: boolean;
  title?: string;
  titleAlign?: ModalTitleAlign;
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
  modalClass?: ClassName;
  modalStyle?: CSSProperties;
  escToClose?: boolean;
  draggable?: boolean;
  fullscreen?: boolean;
  maskAnimationName?: string;
  modalAnimationName?: string;
  bodyClass?: ClassName;
  bodyStyle?: CSSProperties;
  hideTitle?: boolean;
  simple?: boolean;
  onBeforeCancel?: OnBeforeCancel;
  onBeforeOk?: OnBeforeOk;
}

export interface ModalEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel', ev: MouseEvent | KeyboardEvent): void;
  (e: 'open'): void;
  (e: 'beforeOpen'): void;
  (e: 'close'): void;
  (e: 'beforeClose'): void;
}

export interface ModalSlots {
  default(): void;
  header(): void;
  footer(): void;
  title(): void;
}

export type ModalConfig = Omit<ModalProps, 'visible' | 'defaultVisible'> & {
  title?: RenderContent;
  content: RenderContent;
  type?: ModalType;
  serviceCloseFn?: () => void;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onOpen?: () => void;
  onClose?: () => void;
  onBeforeOpen?: () => void;
  onBeforeClose?: () => void;
};

export type ModalType = 'info' | 'warning' | 'error' | 'success';

export type ModalTitleAlign = 'start' | 'center';

export type OnBeforeOk = (
  done: (closed: boolean) => void
) => void | boolean | Promise<boolean | void>;

export type OnBeforeCancel = () => boolean;
