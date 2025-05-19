import { Ref } from 'vue';

export default (params: {
  offsetBottom: Ref<number>;
  offsetRight: Ref<number>;
  reachBottomCb?: () => void;
  reachRightCb?: () => void;
}) => {
  // 触底逻辑的判断
  let lastScrollTop = 0;
  let lastScrollLeft = 0;
  let isBottomReached = false;
  let isRightReached = false;
  const { offsetBottom, offsetRight, reachBottomCb, reachRightCb } = params;
  // 是否触底
  const isReach = (e: Event) => {
    const {
      scrollTop,
      scrollLeft,
      scrollWidth: _scrollWidth,
      scrollHeight: _scrollHeight,
      clientWidth,
      clientHeight,
    } = e.target as HTMLDivElement;
    // 判断滚动方向
    const isScrollingDown = scrollTop > lastScrollTop;
    const isScrollingRight = scrollLeft > lastScrollLeft;
    // 处理触底逻辑 - 只有向下滚动时才检查
    if (
      isScrollingDown &&
      _scrollHeight - (scrollTop + clientHeight) <= offsetBottom.value
    ) {
      if (!isBottomReached) {
        reachBottomCb?.();
        isBottomReached = true;
      }
    } else {
      isBottomReached = false;
    }
    // 处理触右逻辑 - 只有向右滚动时才检查
    if (
      isScrollingRight &&
      _scrollWidth - (scrollLeft + clientWidth) <= offsetRight.value
    ) {
      if (!isRightReached) {
        reachRightCb?.();
        isRightReached = true;
      }
    } else {
      isRightReached = false;
    }
  };
  return {
    isReach,
  };
};
