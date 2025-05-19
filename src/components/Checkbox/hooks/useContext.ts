import { ref, toRefs, Ref, provide as _provide, inject as _inject } from 'vue';
import { CheckboxValue, CheckboxEmits } from '../type';
import { Props } from '@shared/type';
import { useControlValue } from '@shared/utils';

export const CHECKBOX_GROUP_PROVIDE_KEY = 'checkbox-group-props';

interface CheckboxProvide {
  computedValue: Ref<CheckboxValue[] | undefined>;
  max: Ref<number | undefined>;
  disabled: Ref<boolean>;
}

export default () => {
  const provide = (props: Props, emits: CheckboxEmits) => {
    const { modelValue, defaultValue, disabled, max } = toRefs(props);
    // 受控值
    const computedValue = useControlValue<CheckboxValue[]>(
      modelValue,
      defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
      }
    );
    // 提供给子组件
    _provide<CheckboxProvide>(CHECKBOX_GROUP_PROVIDE_KEY, {
      computedValue,
      max,
      disabled,
    });
  };
  const inject = (props: Props) => {
    const { disabled: _disabled } = toRefs(props);
    // 接收的值
    return _inject<CheckboxProvide>(CHECKBOX_GROUP_PROVIDE_KEY, {
      computedValue: ref(),
      max: ref(),
      disabled: _disabled,
    });
  };
  return {
    provide,
    inject,
  };
};
