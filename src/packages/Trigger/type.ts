import { CSSProperties } from 'vue';
import { Fn } from '../_type';

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

/**
 *  已经被内置：auto-fix-position、update-at-scroll、auto-fit-position
 *  尚未实现：alignPoint、scroll-to-close、scroll-to-close-distance;
 */
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
  updateAtScroll?: boolean;
  preventFocus?: boolean;
  clickOutSideIngoreFn?: Fn;
  clickOutsideCallback?: Fn;
  mouseenterCallback?: Fn;
  mouseleaveCallback?: Fn;
};
