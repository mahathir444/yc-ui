import { Directive } from 'vue';
import { isObject } from '../_utils/is';

type EventConfig = {
  eventName: string;
  isPrevent: boolean;
};
export type VPreventBindingValue = string | EventConfig;
// 定义指令
export const vPrevent: Directive<HTMLElement, VPreventBindingValue> = {
  mounted(el, binding) {
    const { value } = binding;
    const { eventName, isPrevent } = isObject(value)
      ? (binding.value as EventConfig)
      : {
          eventName: value,
          isPrevent: true,
        };
    el.addEventListener(eventName, (e: Event) => {
      isPrevent && e.preventDefault();
    });
  },
  unmounted(el, binding) {
    const { value } = binding;
    const { eventName, isPrevent } = isObject(value)
      ? (binding.value as EventConfig)
      : {
          eventName: value,
          isPrevent: true,
        };
    el.removeEventListener(eventName, (e: Event) => {
      isPrevent && e.preventDefault();
    });
  },
};
