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

// popup-offset,popuphoverStay,auto-fit-popup-width,auto-fit-popup-min-width,auto-fix-position,update-at-scroll,auto-fit-position,prevent-focus,scroll-to-close,scroll-to-close-distance
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
  // 未实现
  alignPoint?: boolean;
  //
  blurToClose?: boolean;
  clickToClose?: boolean;
  clickOutsidetoClose?: boolean;
  unmountOnClose?: boolean;
  contentClass?: string;
  contentStyle?: CSSProperties;
  arrowClass?: string;
  arrowStyle?: CSSProperties;
  animationName?: string;
  duration?: number;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
};
