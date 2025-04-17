import { Size } from '@shared/type';
export interface ConfigProviderProps {
  zIndex?: number;
  size?: Size;
  popupContainer?: string;
  updateAtScroll?: boolean;
  scrollToClose?: boolean;
  exchangeTime?: boolean;
}
