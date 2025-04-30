import { PopupContainer } from '@shared/type';
export interface ImageProps {
  src?: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  alt?: string;
  hideFooter?: boolean | 'never';
  footerPosition?: 'inner' | 'outer';
  showLoader?: boolean;
  preview?: boolean;
  previewVisible?: boolean;
  defaultPreviewVisible?: boolean;
  previewProps?: ImagePreviewProps;
  footerClass?: string;
}

export interface ImageEmits {
  (e: 'update:previewVisible', visible: boolean): void;
  (e: 'preview-visible-change', visible: boolean): void;
}

export interface ImageSlots {
  error(): void;
  ['error-icon'](): void;
  loader(): void;
  extra(): void;
}

export interface ImagePreviewProps {
  src?: string;
  visible?: boolean;
  defaultVisible?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  actionsLayout?: string[];
  popupContainer?: PopupContainer;
  escToClose?: boolean;
  wheelZoom?: boolean;
  keyboard?: boolean;
  defaultScale?: number;
  zoomRate?: number;
}

export interface ImagePreviewEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'update:close'): void;
}

export interface ImagePreviewSlots {
  actions(): void;
}

export interface ImagePreviewActionProps {
  name?: string;
  disabled?: boolean;
}

export interface ImagePreviewActionEmits {
  (e: 'click', ev: MouseEvent): void;
  (e: 'dblclick', ev: MouseEvent): void;
  (e: 'contextmenu', ev: MouseEvent): void;
}

export interface ImagePreviewActionSlots {
  default(): void;
}
