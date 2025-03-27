import { computed, ref, Ref } from 'vue';
import { Fn } from '../type';
import { isUndefined } from '../utils/is';

export default <T>(
  modelValue: Ref<T | undefined>,
  defaultValue: T,
  onSet: Fn = (data: T) => data,
  onGet: Fn = (data: T) => data,
  onTrasnform: Fn = (data: T) => data
) => {
  const controlValue = ref<T>(onTrasnform(defaultValue));
  return computed({
    get() {
      const value = isUndefined(modelValue.value)
        ? controlValue.value
        : onTrasnform(modelValue.value);
      return onGet(value);
    },
    set(value: T) {
      controlValue.value = value;
      onSet(value);
    },
  });
};
