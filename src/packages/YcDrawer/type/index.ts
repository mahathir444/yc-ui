import { CSSProperties } from 'vue';
type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';

export interface YcDrawerProps {
  visible?: boolean;
  placement?: DrawerPlacement;
  title?: string;
  mask?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  okText?: string;
  cancelText?: string;
  width?: number;
  height?: number;
  zIndex?: number;
  header?: boolean;
  footer?: boolean;
  drawerStyle?: CSSProperties;
  unmountOnClose?: boolean;
  popupContainer?: string | HTMLElement;
  escToClose?: boolean;
}
