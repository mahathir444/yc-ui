import { isString, isObject } from './is';

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

/**
 * 提取 DOM 元素内所有文本内容
 */
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
