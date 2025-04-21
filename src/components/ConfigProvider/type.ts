import { Size } from '@shared/type';
import { Ref } from 'vue';
import { PopupContainer } from '@shared/type';
export interface ConfigProviderProps {
  zIndex?: number;
  size?: Size;
  popupContainer?: PopupContainer;
  updateAtScroll?: boolean;
  scrollToClose?: boolean;
  exchangeTime?: boolean;
}

export interface ConfigProviderProvide {
  zIndex: Ref<number>;
  size: Ref<Size>;
  popupContainer: Ref<PopupContainer>;
  updateAtScroll: Ref<boolean>;
  scrollToClose: Ref<boolean>;
  exchangeTime: Ref<boolean>;
}
