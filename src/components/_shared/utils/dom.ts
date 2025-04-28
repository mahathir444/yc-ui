import { isString } from './is';
import { BreakpointName } from '@/components/Grid';
import { useMediaQuery } from '@vueuse/core';
import { watch, Ref } from 'vue';
// 是否是服务端渲染
export const isServerRendering = (() => {
  try {
    return !(typeof window !== 'undefined' && document !== undefined);
  } catch (e) {
    return true;
  }
})();

const NOOP = () => {
  return undefined;
};

// 查询
export const querySelector = (
  selectors: string,
  container?: Document | HTMLElement
) => {
  if (isServerRendering) {
    return NOOP();
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
export function getTextContent(
  dom: HTMLElement | Node | null,
  separator: string = ''
): string {
  const texts: string[] = [];
  // 递归遍历节点
  const walk = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue?.trim() || '';
      if (text) texts.push(text);
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach((child) => walk(child));
    }
  };
  // 安全处理 null 或非元素节点
  if (!dom || !(dom instanceof Node)) return '';
  walk(dom);
  return texts.join(separator);
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

// 判断一个对象是否是 DOM 对象
export function isDOMObject(obj: unknown): obj is Element | Document | Window {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  // 检查是否是 window 对象
  if (obj === window) {
    return true;
  }

  // 检查是否是 document 对象
  if (obj === document) {
    return true;
  }

  // 检查是否是节点类型 (Element, Text, Comment 等)
  if (typeof (obj as Node).nodeType === 'number') {
    return true;
  }

  // 检查是否是 DOM 元素 (适用于某些环境，如 iframe)
  if ((obj as HTMLElement).nodeName !== undefined) {
    return true;
  }

  return false;
}
