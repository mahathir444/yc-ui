import { CSSProperties } from 'vue';
import { ButtonProps } from '@/components/Button';
import { OnBeforeCancel } from '@/components/Modal';
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

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';
