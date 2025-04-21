import { Fn } from '@vueuse/core';
import { CSSProperties, Ref } from 'vue';
import { PopupContainer } from '@shared/type';
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

// 内部使用
export type TriggerProvide = {
  level: number;
  curHoverLevel: Ref<number>;
  groupIds: Ref<string[]>;
  timeout: Ref<NodeJS.Timeout | undefined>;
  hoverTimer: Ref<NodeJS.Timeout | undefined>;
  hide?: Fn;
};
