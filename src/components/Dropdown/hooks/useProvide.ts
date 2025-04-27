import { toRefs, provide as _provide, inject as _inject, Reactive } from 'vue';
import { DoptionValue, DropdownEmits } from '../type';
import { useControlValue } from '@shared/hooks';

export const DROPDOWN_PROVIDE_KEY = 'dropdown-props';

export interface DropdownProvide {
  select: (value: DoptionValue, ev: MouseEvent) => void;
}

type Props = Reactive<Record<string, any>>;

export default () => {
  const provide = (props: Props, emits: DropdownEmits) => {
    const {
      popupVisible,
      defaultPopupVisible,
      hideOnSelect,
      position: _position,
    } = toRefs(props);
    // 受控的visible
    const computedVisible = useControlValue<boolean>(
      popupVisible,
      defaultPopupVisible.value,
      (val) => {
        emits('update:popupVisible', val);
        emits('popup-visible-change', val);
      }
    );
    // dropdown提供的值
    _provide<DropdownProvide>(DROPDOWN_PROVIDE_KEY, {
      select: (value: DoptionValue, ev: MouseEvent) => {
        emits('select', value, ev);
        if (!hideOnSelect.value) return;
        computedVisible.value = false;
      },
    });
    return {
      computedVisible,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<DropdownProvide>(DROPDOWN_PROVIDE_KEY, {
      select: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
