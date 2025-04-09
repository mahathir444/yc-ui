//睡眠函数
export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
};

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: ThrottleOptions = {}
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  const { leading = true, trailing = true } = options;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now();
    const context = this;

    // 如果不是首次执行且禁用leading
    if (!previous && leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      // 清除之前的定时器
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      return func.apply(context, args);
    } else if (trailing && !timeout) {
      // 设置定时器在剩余时间后执行
      timeout = setTimeout(() => {
        previous = leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * 增强版防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间(毫秒)
 * @param options 配置选项
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: DebounceOptions = {}
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime: number | null = null;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let maxWait = 0;

  const {
    leading: optionLeading = false,
    trailing = true,
    maxWait: optionMaxWait,
  } = options;

  // 计算是否需要立即执行
  const shouldInvoke = (time: number) => {
    if (lastCallTime === null) return true;
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return (
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  };

  // 执行函数
  const invokeFunc = (time: number, args: Parameters<T>) => {
    lastInvokeTime = time;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    func.apply(null, args);
  };

  // 启动定时器
  const startTimer = (pendingFunc: () => void, waitTime: number) => {
    return setTimeout(pendingFunc, waitTime);
  };

  // 剩余等待时间
  const remainingWait = (time: number) => {
    if (lastCallTime === null) return 0;
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  };

  // 检查是否应该立即执行
  const shouldInvokeOnLeading = (time: number) => {
    return leading && (lastCallTime === null || time - lastCallTime >= wait);
  };

  // 定时器回调
  const timerExpired = () => {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // 重启定时器
    timeout = startTimer(timerExpired, remainingWait(time));
  };

  // 前缘执行
  const leadingEdge = (time: number, args: Parameters<T>) => {
    lastInvokeTime = time;
    if (optionLeading) {
      invokeFunc(time, args);
    }
    timeout = startTimer(timerExpired, wait);
    leading = true;
    return timeout;
  };

  // 后缘执行
  const trailingEdge = (time: number) => {
    timeout = null;
    if (trailing && lastCallTime !== null) {
      invokeFunc(time, lastArgs as Parameters<T>);
    }
    lastCallTime = null;
    lastArgs = null;
    leading = false;
  };

  let lastArgs: Parameters<T> | null = null;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastCallTime = time;

    if (isInvoking) {
      if (timeout === null) {
        return leadingEdge(time, args);
      }
      if (maxing) {
        timeout = startTimer(timerExpired, wait);
        return invokeFunc(time, args);
      }
    }

    if (timeout === null) {
      timeout = startTimer(timerExpired, wait);
    }
  };

  // 添加取消方法
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    lastCallTime = null;
    lastArgs = null;
    timeout = null;
    leading = false;
  };

  // 添加立即执行方法
  debounced.flush = () => {
    if (timeout) {
      clearTimeout(timeout);
      trailingEdge(Date.now());
    }
  };

  return debounced;
}
