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

type BreakpointName = string;
type MediaQueryString = string;
type MediaQueryHandler = (
  name: BreakpointName,
  isActive: boolean,
  currentBreakpoint: BreakpointName | null
) => void;
interface MediaQueryEntry {
  mq: MediaQueryList;
  active: boolean;
}
interface MediaQueryManagerOptions {
  debounceTime?: number;
}

export class MediaQueryManager {
  private queries: Record<BreakpointName, MediaQueryEntry>;
  private handlers: MediaQueryHandler[];
  private currentBreakpoint: BreakpointName | null;
  private debouncedCheck: () => void;

  constructor(
    queries: Record<BreakpointName, MediaQueryString>,
    options: MediaQueryManagerOptions = {}
  ) {
    this.queries = {};
    this.handlers = [];
    this.currentBreakpoint = null;

    // 初始化查询
    Object.entries(queries).forEach(([name, query]) => {
      this.queries[name] = {
        mq: window.matchMedia(query),
        active: false,
      };
    });

    // 初始检查
    this.checkAll();

    // 添加防抖监听
    const { debounceTime = 100 } = options;
    this.debouncedCheck = this.debounce(this.checkAll.bind(this), debounceTime);
    Object.values(this.queries).forEach(({ mq }) => {
      mq.addEventListener('change', this.debouncedCheck);
    });
  }

  private debounce(fn: Function, delay: number): () => void {
    let timer: number;
    return () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => fn(), delay);
    };
  }

  private checkAll(): void {
    let activeFound = false;

    Object.entries(this.queries).forEach(([name, { mq, active }]) => {
      const isActive = mq.matches;
      if (isActive !== active) {
        this.queries[name].active = isActive;
        this.notifyHandlers(name, isActive);
      }

      if (isActive && !activeFound) {
        this.currentBreakpoint = name;
        activeFound = true;
      }
    });

    if (!activeFound) {
      this.currentBreakpoint = null;
    }
  }

  public addHandler(handler: MediaQueryHandler): () => void {
    this.handlers.push(handler);

    // 立即通知当前状态
    Object.entries(this.queries).forEach(([name, { active }]) => {
      if (active) {
        handler(name, true, this.currentBreakpoint);
      }
    });

    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler);
    };
  }

  private notifyHandlers(name: BreakpointName, isActive: boolean): void {
    this.handlers.forEach((handler) => {
      handler(name, isActive, this.currentBreakpoint);
    });
  }

  public getCurrentBreakpoint(): BreakpointName | null {
    return this.currentBreakpoint;
  }

  public isActive(name: BreakpointName): boolean {
    return this.queries[name]?.active ?? false;
  }

  public destroy(): void {
    Object.values(this.queries).forEach(({ mq }) => {
      mq.removeEventListener('change', this.debouncedCheck);
    });
    this.handlers = [];
  }
}
