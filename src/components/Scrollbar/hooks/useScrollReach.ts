import { Ref, ref, onMounted, onUnmounted, unref } from 'vue';
import { throttle } from '@shared/utils';

export interface UseScrollOptions {
  /**
   * 目标滚动的 DOM 元素引用
   */
  target: Ref<HTMLElement | null | undefined>;
  /**
   * 距离底部多少像素时触发，可以是一个数字或 Ref<number>
   * @default 0
   */
  offsetBottom?: number | Ref<number>;
  /**
   * 距离右侧多少像素时触发，可以是一个数字或 Ref<number>
   * @default 0
   */
  offsetRight?: number | Ref<number>;
  /**
   * 到达底部时触发的回调函数，仅在状态从 false 变为 true 时触发一次
   */
  onReachBottom?: () => void;
  /**
   * 到达右侧时触发的回调函数，仅在状态从 false 变为 true 时触发一次
   */
  onReachRight?: () => void;
  /**
   * 滚动事件的节流延迟（毫秒）
   * @default 150
   */
  throttleDelay?: number;
}

export default (options: UseScrollOptions) => {
  const {
    target,
    offsetBottom = 0,
    offsetRight = 0,
    onReachBottom,
    onReachRight,
    throttleDelay = 150,
  } = options;

  // 响应式状态
  const isBottomReached = ref(false);
  const isRightReached = ref(false);
  const scrollTop = ref(0);
  const scrollLeft = ref(0);

  const handleScroll = () => {
    const el = target.value;
    if (!el) return; // 如果元素不存在，则不执行任何操作

    // 更新当前滚动位置
    scrollTop.value = el.scrollTop;
    scrollLeft.value = el.scrollLeft;

    // 获取临界值 (处理 Ref<number> 或 number 的情况)
    const bottomThreshold = unref(offsetBottom);
    const rightThreshold = unref(offsetRight);

    // --- 检查是否到达底部 ---
    // 条件：可滚动的总高度 - 已经滚动的距离 - 可见区域的高度 <= 临界值
    // el.scrollHeight - el.scrollTop - el.clientHeight 约等于 0 时，表示已在最底部
    const isAtBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight <= bottomThreshold;

    if (isAtBottom) {
      // 只有当状态从未到达变为到达时，才触发回调
      if (!isBottomReached.value) {
        onReachBottom?.();
      }
      isBottomReached.value = true;
    } else {
      isBottomReached.value = false;
    }

    // --- 检查是否到达右侧 ---
    // 条件：可滚动的总宽度 - 已经向左滚动的距离 - 可见区域的宽度 <= 临界值
    const isAtRight =
      el.scrollWidth - el.scrollLeft - el.offsetWidth <= rightThreshold;

    if (isAtRight) {
      // 只有当状态从未到达变为到达时，才触发回调
      if (!isRightReached.value) {
        onReachRight?.();
      }
      isRightReached.value = true;
    } else {
      isRightReached.value = false;
    }
  };

  // 创建节流版的滚动处理函数
  const throttledScrollHandler = throttle(handleScroll, throttleDelay);

  onMounted(() => {
    // 确保在 DOM 挂载后执行
    if (target.value) {
      target.value.addEventListener('scroll', throttledScrollHandler);
      // **极端情况处理**: 立即执行一次检查。
      // 这可以处理内容初始时就不满足滚动条件（即已经触底/触右）的情况。
      handleScroll();
    }
  });

  onUnmounted(() => {
    // 组件卸载时移除监听，防止内存泄漏
    if (target.value) {
      target.value.removeEventListener('scroll', throttledScrollHandler);
    }
  });

  // 返回响应式状态，供组件使用
  return {
    isBottomReached,
    isRightReached,
    scrollTop,
    scrollLeft,
  };
};
