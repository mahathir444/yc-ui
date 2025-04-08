import { CSSProperties, Ref, ComputedRef } from 'vue';

export interface ScrollbarProps {
  type?: TackType;
  scrollbarType?: ScrollbarType;
  outerClass?: string;
  outerStyle?: CSSProperties;
  autoFill?: boolean;
  scrollbarSize?: ScrollbarSize;
}

export type TackType = 'track' | 'embed';

export type ScrollbarType = 'virtual' | 'real';

export interface ScrollbarSize {
  verticalTrack?: number;
  verticalThumb?: number;
  horizontalTrack?: number;
  horizontalThumb?: number;
}

// 内部使用
export interface ScrollbarProvide {
  curTop: Ref<number>;
  curLeft: Ref<number>;
  movableLeft: Ref<number> | ComputedRef<number>;
  movableTop: Ref<number> | ComputedRef<number>;
  thumbHeight: Ref<number> | ComputedRef<number>;
  thumbWidth: Ref<number> | ComputedRef<number>;
  scrollbarSize: Ref<ScrollbarSize>;
  scrollRef: Ref<HTMLDivElement | undefined>;
}
