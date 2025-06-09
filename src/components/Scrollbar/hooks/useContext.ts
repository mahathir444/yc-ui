import { Ref, provide as _provide, inject as _inject, ref } from 'vue';

export const SCROLLBAR_CONTEXT_KEY = 'scrollbar-context';

export interface ScrollbarContext {
  curTop: Ref<number>;
  curLeft: Ref<number>;
  movableLeft: Ref<number>;
  movableTop: Ref<number>;
  thumbHeight: Ref<number>;
  thumbWidth: Ref<number>;
  isDragging: Ref<boolean>;
  scrollRef: Ref<HTMLDivElement | undefined>;
}

export default () => {
  const provide = (params: ScrollbarContext) => {
    _provide<ScrollbarContext>(SCROLLBAR_CONTEXT_KEY, params);
  };
  const inject = () => {
    return _inject<ScrollbarContext>(SCROLLBAR_CONTEXT_KEY, {
      curTop: ref(0),
      curLeft: ref(0),
      movableLeft: ref(0),
      movableTop: ref(0),
      thumbHeight: ref(0),
      thumbWidth: ref(0),
      scrollRef: ref(),
      isDragging: ref(false),
    });
  };
  return {
    provide,
    inject,
  };
};
