import { ref, toRefs, provide as _provide, inject as _inject, Ref } from 'vue';
import { DoptionValue, DropdownEmits } from '../type';
import { Props, Theme } from '@shared/type';
import { TriggerInstance } from '@/components/Trigger';

export const DROPDOWN_CONTEXT_KEY = 'dropdown-context';

export interface DropdownContext {
  theme: Ref<Theme>;
  select: (value: DoptionValue, ev: MouseEvent) => void;
}

export default () => {
  const provide = (
    props: Props,
    emits: DropdownEmits,
    triggerRef: Ref<TriggerInstance | undefined>
  ) => {
    const { hideOnSelect, theme, position: _position } = toRefs(props);
    // dropdown提供的值
    _provide<DropdownContext>(DROPDOWN_CONTEXT_KEY, {
      theme,
      select: (value: DoptionValue, ev: MouseEvent) => {
        emits('select', value, ev);
        if (!hideOnSelect.value) return;
        triggerRef.value?.hide();
      },
    });
  };
  const inject = () => {
    // 接收的值
    return _inject<DropdownContext>(DROPDOWN_CONTEXT_KEY, {
      theme: ref('light'),
      select: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
