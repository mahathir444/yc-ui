import { Ref } from 'vue';

type ScrollParams = {
  scrollLeft: number;
  scrollTop: number;
  isBottomReached: boolean;
  isRightReached: boolean;
};
export default (params: {
  offsetBottom: Ref<number>;
  offsetRight: Ref<number>;
  scrolCb?: (params: ScrollParams) => void;
  reachBottomCb?: () => void;
  reachRightCb?: () => void;
}) => {
  // 触底逻辑的判断
  let lastScrollTop = 0;
  let lastScrollLeft = 0;
  let isBottomReached = false;
  let isRightReached = false;
  const { offsetBottom, offsetRight, reachBottomCb, reachRightCb, scrolCb } =
    params;
  // 是否触底
  const isReach = (e: Event) => {
    const {
      scrollTop,
      scrollLeft,
      offsetWidth,
      clientHeight,
      offsetHeight,
      scrollHeight,
      scrollWidth,
    } = e.target as HTMLDivElement;
    // 判断滚动方向
    const isScrollingDown = scrollTop >= lastScrollTop;
    const isScrollingRight = scrollLeft >= lastScrollLeft;
    console.log(offsetHeight, clientHeight, scrollHeight);
    console.log(lastScrollTop, scrollTop, 'top');
    // 处理触底逻辑 - 只有向下滚动时才检查
    if (
      isScrollingDown &&
      scrollHeight - (scrollTop + offsetHeight) <= offsetBottom.value
    ) {
      if (!isBottomReached) {
        isBottomReached = true;
        reachBottomCb?.();
      }
    } else {
      isBottomReached = false;
    }
    // 处理触右逻辑 - 只有向右滚动时才检查
    if (
      isScrollingRight &&
      scrollWidth - (scrollLeft + offsetWidth) <= offsetRight.value
    ) {
      if (!isRightReached) {
        reachRightCb?.();
        isRightReached = true;
      }
    } else {
      isRightReached = false;
    }
    lastScrollTop = scrollTop;
    lastScrollLeft = scrollLeft;
    scrolCb?.({
      scrollLeft,
      scrollTop,
      isBottomReached,
      isRightReached,
    });
  };
  return {
    isReach,
  };
};
