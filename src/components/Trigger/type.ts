import { Fn } from '@vueuse/core';
import { CSSProperties, Ref } from 'vue';
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
  // 是否需要
  needTransformOrigin?: boolean;
  // 是否嵌套
  isNested?: boolean;
  // 是否是dropdown
  isDropdown?: boolean;
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

// 内部使用
export type ProvideType = {
  level: number;
  curLevel: Ref<number>;
  groupIds: Ref<string[]>;
  timeout: Ref<NodeJS.Timeout | undefined>;
  hide?: Fn;
};
