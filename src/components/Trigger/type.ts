import { CSSProperties } from 'vue';
export type TriggerProps = {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerType;
  position?: TriggerPostion;
  disabled?: boolean;
  popupOffset?: number;
  popupTranslate?: number[];
  showArrow?: boolean;
  popuphoverStay?: boolean;
  blurToClose?: boolean;
  clickToClose?: boolean;
  clickOutsideToClose?: boolean;
  unmountOnClose?: boolean;
  wrapperClass?: string;
  contentClass?: string;
  contentStyle?: CSSProperties;
  arrowClass?: string;
  arrowStyle?: CSSProperties;
  animationName?: string;
  duration?: number;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
  autoFitPopupWidth?: boolean;
  autoFitPopupMinWidth?: boolean;
  popupContainer?: PopupContainer;
  renderToBody?: boolean;
  autoFitPosition?: boolean;
  updateAtScroll?: boolean;
  preventFocus?: boolean;
  alignPoint?: boolean;
  scrollToClose?: boolean;
  scrollToCloseDistance?: number;
  needTransformOrigin?: boolean;
  clickOutSideIngoreFn?: (e: HTMLElement) => void;
  mouseenterCallback?: (isTrigger: boolean, e: MouseEvent) => void;
};

export type TriggerPostion =
  | 'top'
  | 'tl'
  | 'tr'
  | 'bottom'
  | 'bl'
  | 'br'
  | 'left'
  | 'lt'
  | 'lb'
  | 'right'
  | 'rt'
  | 'rb';

export type TriggerType = 'hover' | 'click' | 'focus' | 'contextMenu';

export type PopupContainer = string | HTMLElement;
