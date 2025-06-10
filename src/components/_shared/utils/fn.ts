import { isNumber, isString, isUndefined } from './is';

//睡眠函数
export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
};

// 节流
export function throttleByRaf(cb: (...args: any[]) => void) {
  let timer = 0;

  const throttle = (...args: any[]): void => {
    if (timer) {
      window.cancelAnimationFrame(timer);
    }
    timer = window.requestAnimationFrame(() => {
      cb(...args);
      timer = 0;
    });
  };

  throttle.cancel = () => {
    window.cancelAnimationFrame(timer);
    timer = 0;
  };

  return throttle;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let isInvoked = false;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate && !isInvoked) {
      func.apply(context, args);
      isInvoked = true;
    }

    timer = setTimeout(() => {
      if (!immediate) {
        func.apply(context, args);
      }
      isInvoked = false;
    }, delay);
  };
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = delay - (now - lastTime);

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    if (remaining <= 0) {
      fn.apply(this, args);
      lastTime = now;
    } else {
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
        timeoutId = null;
      }, remaining);
    }
  };
}

export const numberToPx = (value: string | number | undefined) => {
  if (isUndefined(value)) return '';
  // 检查是否是数字类型，或者是可以转换为数字的字符串
  if (
    isNumber(value) ||
    (isString(value) &&
      !isNaN(Number.parseInt(value)) &&
      !isNaN(Number.parseFloat(value)))
  ) {
    return value + 'px';
  }
  // 其他情况直接返回原始值（如果是字符串）
  return value;
};
