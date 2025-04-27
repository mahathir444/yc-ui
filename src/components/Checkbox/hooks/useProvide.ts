import {
  ref,
  toRefs,
  WritableComputedRef,
  Ref,
  provide as _provide,
  inject as _inject,
  Reactive,
} from 'vue';
import { CheckboxValue, CheckboxEmits } from '../type';
import { useControlValue } from '@shared/hooks';

export const CHECKBOX_GROUP_PROVIDE_KEY = 'checkbox-group-props';

interface CheckboxProvide {
  computedValue: WritableComputedRef<CheckboxValue[]> | Ref<undefined>;
  max: Ref<number | undefined>;
  disabled: Ref<boolean>;
}

type Props = Reactive<Record<string, any>>;

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
      computedValue: ref(undefined),
      max: ref(undefined),
      disabled: _disabled,
    });
  };
  return {
    provide,
    inject,
  };
};
