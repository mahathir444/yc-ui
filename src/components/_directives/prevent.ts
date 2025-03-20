import { Directive } from 'vue';

export type VPreventBindingValue = {
  eventName: string;
  isPrevent?: boolean;
};
// 阻止事件
const eventPrevent = (e: Event) => {
  e.preventDefault();
};
// 定义指令
export const vPrevent: Directive<HTMLElement, VPreventBindingValue> = {
  mounted(el, binding) {
    const { value } = binding;
    const { eventName, isPrevent = true } = value;
    if (!isPrevent) return;
    el.addEventListener(eventName, eventPrevent);
  },
  unmounted(el, binding) {
    const { value } = binding;
    const { eventName } = value;
    el.removeEventListener(eventName, eventPrevent);
  },
};
