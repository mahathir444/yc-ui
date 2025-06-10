import { CSSProperties } from 'vue';
import { ButtonProps } from '@/components/Button';
import { OnBeforeCancel, OnBeforeOk } from '@/components/Modal';
import { RenderContent, PopupContainer } from '@shared/type';
export interface DrawerProps {
  visible?: boolean;
  defaultVisible?: boolean;
  placement?: DrawerPlacement;
  title?: string;
  mask?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  okText?: string;
  cancelText?: string;
  okLoading?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  unmountOnClose?: boolean;
  width?: number | string;
  height?: number | string;
  popupContainer?: PopupContainer;
  drawerStyle?: CSSProperties;
  escToClose?: boolean;
  renderToBody?: boolean;
  header?: boolean;
  footer?: boolean;
  hideCancel?: boolean;
  onBeforeCancel?: OnBeforeCancel;
  onBeforeOk?: OnBeforeOk;
}

export interface DrawerSlots {
  default(): void;
  header(): void;
  footer(): void;
  title(): void;
}

export interface DrawerEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel', event: MouseEvent | KeyboardEvent): void;
  (e: 'beforeOpen'): void;
  (e: 'open'): void;
  (e: 'beforeClose'): void;
  (e: 'close'): void;
}

export type DrawerConfig = Omit<DrawerProps, 'visible' | 'defaultVisible'> & {
  content?: RenderContent;
  title?: RenderContent;
  serviceCloseFn?: () => void;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onOpen?: () => void;
  onClose?: () => void;
  onBeforeOpen?: () => void;
  onBeforeClose?: () => void;
};

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';
