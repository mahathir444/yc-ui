//睡眠函数
export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
};

const raf = window.requestAnimationFrame;
const caf = window.cancelAnimationFrame;

export function throttleByRaf(cb: (...args: any[]) => void) {
  let timer = 0;

  const throttle = (...args: any[]): void => {
    if (timer) {
      caf(timer);
    }
    timer = raf(() => {
      cb(...args);
      timer = 0;
    });
  };

  throttle.cancel = () => {
    caf(timer);
    timer = 0;
  };

  return throttle;
}
