import { isString } from './is';
import { BreakpointName } from '@/components/Grid';
import { useMediaQuery } from '@vueuse/core';
import { watch, Ref } from 'vue';
import { unrefElement } from './vue-utils';
// 是否是服务端渲染
export const isServerRendering = (() => {
  try {
    return !(typeof window !== 'undefined' && document !== undefined);
  } catch (e) {
    return true;
  }
})();

// 查询
export const querySelector = (
  selectors: string,
  container?: Document | HTMLElement
) => {
  if (isServerRendering) {
    return undefined;
  }
  return (
    (container ?? document).querySelector<HTMLElement>(selectors) ?? undefined
  );
};

// 获取html元素
export const getElement = (
  target: string | HTMLElement | undefined,
  container?: Document | HTMLElement
): HTMLElement | undefined => {
  if (isString(target)) {
    const selector = target[0] === '#' ? `[id='${target.slice(1)}']` : target;
    return querySelector(selector, container);
  }
  return target;
};

// 提取 DOM 元素内所有文本内容
export function getTextContent(dom: Ref<HTMLElement | undefined>): string {
  return unrefElement(dom)?.innerText || '';
}

// 获取媒体查询队列
const getMedicaQueryQuerues = () => {
  return {
    xs: '(min-width: 0)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
  };
};

// 媒体查询
export const mediaQueryHandler = (
  onBreakpoint: (
    breakpoint: BreakpointName,
    order: Record<string, number>,
    index: number
  ) => void,
  queries: Record<string, string> = getMedicaQueryQuerues()
) => {
  const breakpoints: string[] = [];
  const order: Record<string, number> = {};
  const matches: Ref<boolean>[] = [];
  Object.keys(queries).forEach((key, i) => {
    breakpoints.push(key);
    order[key] = i;
    matches.push(useMediaQuery(queries[key]));
  });
  watch(
    matches,
    (val) => {
      const i = val.lastIndexOf(true);
      onBreakpoint(breakpoints[i] as BreakpointName, order, i);
    },
    {
      immediate: true,
    }
  );
};

// 查找元素的第一个可滚动父元素
export function findFirstScrollableParent(element?: HTMLElement) {
  if (!element || element === document.body) {
    return;
  }
  let currentElement: HTMLElement | null = element.parentElement;
  while (currentElement && currentElement !== document.body) {
    const style = window.getComputedStyle(currentElement);
    const overflow = style.overflowY || style.overflow;
    // 检查元素是否可滚动（垂直方向）
    const isScrollable = overflow === 'auto' || overflow === 'scroll';
    const canScroll = currentElement.scrollHeight > currentElement.clientHeight;

    if (isScrollable && canScroll) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  return;
}
