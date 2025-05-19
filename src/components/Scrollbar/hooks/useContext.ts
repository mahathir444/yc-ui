import { Ref, provide as _provide, inject as _inject, ref } from 'vue';

export const SCROLLBAR_PROVIDE_KEY = 'scrollbar-context';

export interface ScrollbarContext {
  curTop: Ref<number>;
  curLeft: Ref<number>;
  movableLeft: Ref<number>;
  movableTop: Ref<number>;
  thumbHeight: Ref<number>;
  thumbWidth: Ref<number>;
  scrollRef: Ref<HTMLDivElement | undefined>;
}

export default () => {
  const inject = () => {
    return _inject<ScrollbarContext>(SCROLLBAR_PROVIDE_KEY, {
      curTop: ref(0),
      curLeft: ref(0),
      movableLeft: ref(0),
      movableTop: ref(0),
      thumbHeight: ref(0),
      thumbWidth: ref(0),
      scrollRef: ref(),
    });
  };
  return {
    inject,
  };
};
