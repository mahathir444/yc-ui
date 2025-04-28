import { Size, PopupContainer } from '@shared/type';
export interface ConfigProviderProps {
  zIndex?: number;
  size?: Size;
  popupContainer?: PopupContainer;
  updateAtScroll?: boolean;
  scrollToClose?: boolean;
  exchangeTime?: boolean;
}
