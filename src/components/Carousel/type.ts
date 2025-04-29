import { Direction } from '@shared/type';
export interface CarouselProps {
  current?: number;
  defaultCurrent?: number;
  autoPlay?: boolean;
  moveSpeed?: number;
  animationName?: 'slide' | 'fade' | 'card';
  trigger?: IndicatorTrigger;
  direction?: Direction;
  showArrow?: ShowArrow;
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

export type ShowArrow = 'always' | 'hover' | 'never';
export type IndicatorPosition = 'bottom' | 'top' | 'left' | 'right' | 'outer';
export type IndicatorType = 'line' | 'dot' | 'slider' | 'never';
export type IndicatorTrigger = 'click' | 'hover';

export interface CarouselItemSlots {
  default(): void;
}
