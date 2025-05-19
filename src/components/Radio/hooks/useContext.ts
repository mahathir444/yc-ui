import { ref, toRefs, Ref, provide as _provide, inject as _inject } from 'vue';
import { RadioType, RadioGroupEmits, RadioValue } from '../type';
import { Size, Props } from '@shared/type';
import { useControlValue, getGlobalConfig } from '@shared/utils';

export const RADIO_GROUP_PROVIDE_KEY = 'radio-group-context';

export interface RadioContext {
  computedValue: Ref<RadioValue | undefined>;
  type: Ref<RadioType>;
  disabled: Ref<boolean>;
  size: Ref<Size>;
}

export default () => {
  const provide = (props: Props, emits: RadioGroupEmits) => {
    const { modelValue, defaultValue, disabled, type } = toRefs(props);
    // 获取全局配置
    const { size } = getGlobalConfig(props);
    // 受控值
    const computedValue = useControlValue<RadioValue>(
      modelValue,
      defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
      }
    );
    // 提供给子组件
    _provide<RadioContext>(RADIO_GROUP_PROVIDE_KEY, {
      computedValue,
      type,
      disabled,
      size,
    });
  };
  const inject = (props: Props) => {
    const { disabled: _disabled, type: _type } = toRefs(props);
    // 接收的值
    return _inject<RadioContext>(RADIO_GROUP_PROVIDE_KEY, {
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
