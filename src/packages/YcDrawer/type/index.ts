import { CSSProperties } from 'vue';
import { YcButtonProps } from '@/packages/YcButton/type';
type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';

// default-visible ok-loading unmount-on-close on-before-ok on-before-cancel
export interface YcDrawerProps {
  visible?: boolean;
  placement?: DrawerPlacement;
  title?: string;
  mask?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  okText?: string;
  cancelText?: string;
  okButtonProps?: YcButtonProps;
  cancelButtonProps?: YcButtonProps;
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
