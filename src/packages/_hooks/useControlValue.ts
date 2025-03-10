import { computed, ref, Ref } from 'vue';
import { isUndefined } from '../_utils/is';
import { Fn } from '../_type';

export default <T>(
  modelValue: Ref<T | undefined>,
  defaultValue: Ref<T>,
  onSet?: Fn
) => {
  const controlValue = ref<T>(defaultValue.value);
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
