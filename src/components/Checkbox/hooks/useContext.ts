import { ref, toRefs, Ref, provide as _provide, inject as _inject } from 'vue';
import { CheckboxValue, CheckboxEmits } from '../type';
import { Props } from '@shared/type';
import { useControlValue } from '@shared/utils';

export const CHECKBOX_GROUP_CONTEXT_KEY = 'checkbox-group-context';

interface CheckboxContext {
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
    _provide<CheckboxContext>(CHECKBOX_GROUP_CONTEXT_KEY, {
      computedValue,
      max,
      disabled,
    });
  };
  const inject = (props: Props) => {
    const { disabled } = toRefs(props);
    return _inject<CheckboxContext>(CHECKBOX_GROUP_CONTEXT_KEY, {
      computedValue: ref(),
      max: ref(),
      disabled,
    });
  };
  return {
    provide,
    inject,
  };
};
