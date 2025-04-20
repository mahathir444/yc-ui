import { CSSProperties, Ref, ComputedRef } from 'vue';

export interface ScrollbarProps {
  type?: TackType;
  scrollbarType?: ScrollbarType;
  outerClass?: string;
  outerStyle?: CSSProperties;
  style?: CSSProperties;
  autoFill?: boolean;
}

export type TackType = 'track' | 'embed';

export type ScrollbarType = 'virtual' | 'real';

// 内部使用
export interface ScrollbarProvide {
  curTop: Ref<number>;
  curLeft: Ref<number>;
  movableLeft: Ref<number> | ComputedRef<number>;
  movableTop: Ref<number> | ComputedRef<number>;
  thumbHeight: Ref<number> | ComputedRef<number>;
  thumbWidth: Ref<number> | ComputedRef<number>;
  scrollRef: Ref<HTMLDivElement | undefined>;
}
