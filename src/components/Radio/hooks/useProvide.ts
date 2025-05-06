import {
  ref,
  toRefs,
  WritableComputedRef,
  Ref,
  provide as _provide,
  inject as _inject,
} from 'vue';
import { RadioType, RadioGroupEmits, RadioValue } from '../type';
import { Size, Props } from '@shared/type';
import { useControlValue, useConfigProvder } from '@shared/hooks';

export const RADIO_GROUP_PROVIDE_KEY = 'radio-group-props';

export interface RadioProvide {
  computedValue: WritableComputedRef<RadioValue> | Ref<undefined>;
  type: Ref<RadioType>;
  disabled: Ref<boolean>;
  size: Ref<Size>;
}

export default () => {
  const provide = (props: Props, emits: RadioGroupEmits) => {
    const { modelValue, defaultValue, disabled, type } = toRefs(props);
    // 获取全局配置
    const { size } = useConfigProvder(props);
    // 受控值
    const computedValue = useControlValue<RadioValue>(
      modelValue,
      defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
      }
    );
    // 提供给子组件
    _provide<RadioProvide>(RADIO_GROUP_PROVIDE_KEY, {
      computedValue,
      type,
      disabled,
      size,
    });
  };
  const inject = (props: Props) => {
    const { disabled: _disabled, type: _type } = toRefs(props);
    // 接收的值
    return _inject<RadioProvide>(RADIO_GROUP_PROVIDE_KEY, {
      computedValue: ref(undefined),
      disabled: _disabled,
      type: _type,
      size: ref('medium'),
    });
  };
  return {
    provide,
    inject,
  };
};
