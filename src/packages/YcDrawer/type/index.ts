import { CSSProperties } from 'vue';
import { YcButtonProps } from '@/packages/YcButton/type';
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
  okButtonProps?: YcButtonProps;
  cancelButtonProps?: YcButtonProps;
  width?: number;
  height?: number;
  zIndex?: number;
  header?: boolean;
  footer?: boolean;
  drawerStyle?: CSSProperties;
  popupContainer?: string | HTMLElement;
  escToClose?: boolean;
  hideCancel?: boolean;
}
