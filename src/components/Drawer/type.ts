import { CSSProperties } from 'vue';
import { ButtonProps } from '@/components/Button';
import { OnBeforeCancel } from '@/components/Modal';
import { RenderContent } from '../_shared/type';
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
  width?: number;
  height?: number;
  popupContainer?: string | HTMLElement;
  drawerStyle?: CSSProperties;
  escToClose?: boolean;
  renderToBody?: boolean;
  header?: boolean;
  footer?: boolean;
  hideCancel?: boolean;
  onBeforeCancel?: OnBeforeCancel;
  onBeforeOk?: OnBeforeCancel;
}

export type DrawerConfig = Omit<DrawerProps, 'visible' | 'defaultVisible'> & {
  content?: RenderContent;
  title?: RenderContent;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onOpen?: () => void;
  onClose?: () => void;
  onBeforeOpen?: () => void;
  onBeforeClose?: () => void;
};

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';

// 内部使用
export type DrawerServiceData = {
  id: string;
  container: HTMLDivElement | null;
};
