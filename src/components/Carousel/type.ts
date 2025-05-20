import { Direction } from '@shared/type';
export interface CarouselProps {
  current?: number;
  defaultCurrent?: number;
  autoPlay?: AutoPlay;
  moveSpeed?: number;
  animationName?: CarouselAnimationName;
  trigger?: IndicatorTrigger;
  direction?: Direction;
  showArrow?: CarouselShowArrow;
  arrowClass?: string;
  indicatorType?: IndicatorType;
  indicatorPosition?: IndicatorPosition;
  indicatorClass?: string;
  transitionTimingFunction?: string;
}

export interface CarouselEmits {
  (e: 'update:current', index: number): void;
  (e: 'change', index: number, preIndex: number, isManual: boolean): void;
}

export interface CarouselSlots {
  default(): void;
}

export interface CarouselItemSlots {
  default(): void;
}

export type CarouselAnimationName = 'slide' | 'fade' | 'card';
export type CarouselShowArrow = 'always' | 'hover' | 'never';
export type AutoPlay = boolean | { interval?: number; hoverToPause?: boolean };
export type IndicatorPosition = 'bottom' | 'top' | 'left' | 'right' | 'outer';
export type IndicatorType = 'line' | 'dot' | 'slider' | 'never';
export type IndicatorTrigger = 'click' | 'hover';
