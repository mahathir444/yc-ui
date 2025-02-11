import { CSSProperties } from 'vue';
import { ButtonProps } from '@/packages/YcButton/type';
type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';

// default-visible on-before-ok on-before-cancel
export interface DrawerProps {
  visible?: boolean;
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
}
