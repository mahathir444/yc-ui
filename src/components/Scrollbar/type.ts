import { CSSProperties } from 'vue';

export interface ScrollbarProps {
  type?: TackType;
  outerClass?: string;
  outerStyle?: CSSProperties;
  style?: CSSProperties;
  autoFill?: boolean;
  // 触底偏移量
  offsetBottom?: number;
  offsetRight?: number;
  // 是否真实srollbar
  scrollbar?: boolean;
}

export interface ScrollbarEmits {
  (
    e: 'scroll',
    left: number,
    top: number,
    isRightReached: boolean,
    isBottomReached: boolean
  ): void;
  (e: 'reachBottom'): void;
  (e: 'reachRight'): void;
}

export interface ScrollbarSlots {
  default(): void;
}

export interface ScrollbarExpose {
  scrollTo(options: ScrollOptions): void;
  scrollLeft(left: number): void;
  scrollTop(top: number): void;
  getScrollRef(): HTMLDivElement;
}

export type TackType = 'track' | 'embed';
