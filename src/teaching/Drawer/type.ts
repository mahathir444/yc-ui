import { CSSProperties } from 'vue';
import { ButtonProps } from '@arco-design/web-vue';
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

export type OnBeforeOk = (
  done: (closed: boolean) => void
) => void | boolean | Promise<boolean | void>;

export type OnBeforeCancel = () => boolean;

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';
