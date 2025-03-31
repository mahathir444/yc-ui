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
  // 是否需要trasformOrigin
  needTransformOrigin?: boolean;
  // 是否需要自由设置位置
  autoSetPosition?: boolean;
  onTriggerMouseenter?: Fn;
  onTriggerMouseleave?: Fn;
  onTriggerMouseclick?: Fn;
  onTriggerFocus?: Fn;
  onTriggerBlur?: Fn;
};

export interface TriggerEmits {
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}

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
  curHoverLevel: Ref<number>;
  groupIds: Ref<string[]>;
  timeout: Ref<NodeJS.Timeout | undefined>;
  hide?: Fn;
};
