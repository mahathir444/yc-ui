import { computed, ref, Ref } from 'vue';
import { isUndefined } from '../../_/utils/is';
import { Fn } from '../type';

export default <T>(
  modelValue: Ref<T | undefined>,
  defaultValue: T,
  onSet?: Fn
) => {
  const controlValue = ref<T>(defaultValue);
  return computed({
    get() {
      return isUndefined(modelValue.value)
        ? controlValue.value
        : modelValue.value;
    },
    set(value: T) {
      if (isUndefined(modelValue.value)) {
        controlValue.value = value;
      }
      onSet && onSet(value);
    },
  });
};
