import { computed, ref, Ref } from 'vue';
import { Fn } from '../type';
import { isUndefined } from '../utils/is';

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
