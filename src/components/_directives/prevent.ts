import { Directive } from 'vue';

export type VPreventBindingValue = {
  eventName: string;
  isPrevent?: boolean;
};
// 定义指令
export const vPrevent: Directive<HTMLElement, VPreventBindingValue> = {
  mounted(el, binding) {
    const { value } = binding;
    const { eventName, isPrevent = true } = value;
    el.addEventListener(eventName, (e: Event) => {
      isPrevent && e.preventDefault();
    });
  },
  unmounted(el, binding) {
    const { value } = binding;
    const { eventName, isPrevent = true } = value;
    el.removeEventListener(eventName, (e: Event) => {
      isPrevent && e.preventDefault();
    });
  },
};
