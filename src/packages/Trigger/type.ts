import { CSSProperties } from 'vue';

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

/**
 *  已经被内置：auto-fix-position、update-at-scroll、auto-fit-position
 *  popup-offset、popuphoverStay、prevent-focus、scroll-to-close、scroll-to-close-distance,  alignPoint?: boolean;
 */
export type TriggerProps = {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerType;
  popupContainer?: string | HTMLElement;
  renderToBody?: boolean;
  position?: TriggerPostion;
  disabled?: boolean;
  popupTranslate?: number[];
  showArrow?: boolean;
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
};
