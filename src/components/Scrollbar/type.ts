import { CSSProperties, Ref, ComputedRef } from 'vue';

export type TackType = 'track' | 'embed';
export type ScrollbarType = 'virtual' | 'real';
export interface ScrollbarSize {
  verticalTrack?: number;
  verticalThumb?: number;
  horizontalTrack?: number;
  horizontalThumb?: number;
}

export interface ScrollbarProps {
  type?: TackType;
  scrollbarType?: ScrollbarType;
  outerClass?: string;
  outerStyle?: CSSProperties;
  style?: CSSProperties;
  autoFill?: boolean;
  scrollbarSize?: ScrollbarSize;
}

export interface ProvideType {
  minTop: Ref<number>;
  minLeft: Ref<number>;
  curTop: Ref<number>;
  curLeft: Ref<number>;
  movableLeft: Ref<number> | ComputedRef<number>;
  movableTop: Ref<number> | ComputedRef<number>;
  thumbHeight: Ref<number> | ComputedRef<number>;
  thumbWidth: Ref<number> | ComputedRef<number>;
  scrollbarSize: Ref<ScrollbarSize>;
}
