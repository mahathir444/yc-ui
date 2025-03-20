import { Directive } from 'vue';

type VPreventBindingValue = {
  event: keyof HTMLElementEventMap;
  isPrevent?: boolean;
};
export type VPreventDirective = Directive<HTMLElement, VPreventBindingValue>;
// 阻止事件
const preventEvent = (e: Event) => {
  e.preventDefault();
};
// prevent指令
export const vPrevent: VPreventDirective = {
  mounted(el, binding) {
    const {
      value: { event, isPrevent = true },
    } = binding;
    if (!isPrevent) {
      return;
    }
    el.addEventListener(event, preventEvent);
  },
  unmounted(el, binding) {
    const {
      value: { event },
    } = binding;
    el.removeEventListener(event, preventEvent);
  },
};
