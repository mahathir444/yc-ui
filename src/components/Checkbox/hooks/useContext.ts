import {
  ref,
  toRefs,
  Ref,
  provide as _provide,
  inject as _inject,
  computed,
} from 'vue';
import { CheckboxValue, CheckboxEmits, CheckboxGroupEmits } from '../type';
import { ObjectData, Props } from '@shared/type';
import { isObject, useControlValue } from '@shared/utils';

export const CHECKBOX_GROUP_CONTEXT_KEY = 'checkbox-group-context';

interface CheckboxContext {
  computedValue: Ref<CheckboxValue[]>;
  max: Ref<number>;
  disabled: Ref<boolean>;
  hasGroup: Ref<boolean>;
}

export default () => {
  const provide = (props: Props, emits: CheckboxGroupEmits) => {
    const {
      modelValue,
      defaultValue,
      disabled,
      max,
      options: _options,
    } = toRefs(props);
    // 受控值
    const computedValue = useControlValue<CheckboxValue[]>(
      modelValue,
      defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
        emits('change', val);
      }
    );
    // options
    const options = computed(() => {
      return _options.value.map((item: ObjectData) => {
        return isObject(item) ? item : { label: item, value: item };
      });
    });
    _provide<CheckboxContext>(CHECKBOX_GROUP_CONTEXT_KEY, {
      computedValue,
      max,
      disabled,
      hasGroup: ref(true),
    });
    return {
      options,
    };
  };
  const inject = () => {
    return _inject<CheckboxContext>(CHECKBOX_GROUP_CONTEXT_KEY, {
      computedValue: ref([]),
      max: ref(100000),
      disabled: ref(false),
      hasGroup: ref(false),
    });
  };
  return {
    provide,
    inject,
  };
};
